import type { BuildResult, OnLoadResult, Plugin, PluginBuild } from "esbuild";
import fs from "node:fs";
import path from "node:path";

const uuid = () => (Date.now() * Math.random()).toString(36).slice(0, 8);

const name = `esbuild-plugin-rdi-${uuid()}`;

export interface RDIPluginOptions {
  dedupeUseEffect?: boolean;
  dedupeUseState?: boolean;
  dedupeUseCallback?: boolean;
  dedupeUseMemo?: boolean;
  dedupeUseRef?: boolean;
  skipFiles?: string[];
  skipFilesPattern?: RegExp;
}

const jsxImportRegExp = /(var |,)[a-zA-Z_$][\w$]*=require\("react\/jsx-runtime"\)[;,]?/g;
const regExp2replace2GetVar0 = /(var |,)/;
const regExp2replace2GetVar = /[=]require\(['"]react\/jsx-runtime['"]\)[;,]?/;

const requireTokenRegExp = /require\(['"][^'"]*['"]\)/g;

const extractRequireTokenRegExp = /require\(['"]/g;

const removeDuplicateRequireFromFile = (txt: string) => {
  const requireTokenMatches = txt.match(requireTokenRegExp);
  const requireTokens =
    requireTokenMatches?.map(token => token.replace(extractRequireTokenRegExp, "").slice(-2)) ?? [];

  // get unique tokens sorted
  const uniqueTokens = [...new Set(requireTokens)];
  uniqueTokens.sort((a, b) => a.length - b.length);

  console.log({ uniqueTokens });

  // remove duplicate tokens
  // uniqueTokens.forEach(token => {
  //   const regExp = new RegExp(`require\\(['"]${token}['"]\\)[;,]?`, "g");
  //   txt = txt.replace(regExp, "");
  // });

  // const jsxMatches = txt.match(jsxImportRegExp);
  // if (jsxMatches !== null && jsxMatches.length > 1) {
  //   const importVarName = jsxMatches[0]
  //     .replace(regExp2replace2GetVar, "")
  //     .replace(regExp2replace2GetVar0, "");
  //   for (let index = 1; index < jsxMatches.length; index++) {
  //     let token = jsxMatches[index];
  //     if (/^,.*,$/.test(token)) token = token.slice(1);
  //     else if (/^,.*;$/.test(token)) token = token.replace(";", "");
  //     else if (/^var .*,$/.test(token)) token = token.slice(4);
  //     txt = txt.replace(token, "");
  //     const v1 = jsxMatches[index]
  //       .replace(regExp2replace2GetVar, "")
  //       .replace(regExp2replace2GetVar0, "");
  //     txt = txt.replace(new RegExp(`(?<!--)\\b${v1}\\b`, "g"), importVarName);
  //   }
  // }
  return txt;
};

const onEndCallBack = (result: BuildResult, options: RDIPluginOptions, write?: boolean) => {
  /** remove empty file imports */
  const emptyChunkFiles = result.outputFiles
    ?.filter(f => f.text.trim() === "" && f.path.includes("chunk"))
    .map(f => f.path.split(path.sep).pop());

  const emptyChunkImportRegExp = new RegExp(
    `import *"[^"]*(${emptyChunkFiles?.join("|") || "--no-empty-chunks--"})";[\n\r ]*`,
    "g",
  );

  /** remove multiple imports */
  result.outputFiles
    ?.filter(f => !f.path.endsWith(".map"))
    .forEach(f => {
      let txt = f.text;

      /** remove empty file imports */
      txt = txt.replace(emptyChunkImportRegExp, "");

      /** remove extra jsx-runtime imports */
      if (f.path.endsWith(".js")) txt = removeDuplicateRequireFromFile(txt);
      f.contents = new TextEncoder().encode(txt);
    });

  /** remove empty files */
  result.outputFiles = result.outputFiles?.filter(f => f.text.trim() !== "");
  /** assume true if undefined */
  if (write === undefined || write) {
    result.outputFiles?.forEach(file => {
      fs.mkdirSync(path.dirname(file.path), { recursive: true });
      fs.writeFileSync(file.path, file.contents);
    });
  }
};

const setup = (build: PluginBuild, options: RDIPluginOptions = {}) => {
  const write = build.initialOptions.write;
  build.initialOptions.write = false;

  // Exit early when in watch mode or minification is not required
  if (!build.initialOptions.minify) return;

  build.onEnd(result => onEndCallBack(result, options, write));
};

/**
 * Remove Duplicate Imports
 * This plugin prevents building test files by esbuild. DTS may still geenrate type files for the tests with only { } as file content*/
const rdiPlugin: (options?: RDIPluginOptions) => Plugin = (options = {}) => ({
  name,
  setup: build => setup(build, options),
});

export default rdiPlugin;
