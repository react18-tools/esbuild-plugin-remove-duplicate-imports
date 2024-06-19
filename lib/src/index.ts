import type { BuildResult, Plugin, PluginBuild } from "esbuild";
import fs from "node:fs";
import path from "node:path";

const uuid = () => (Date.now() * Math.random()).toString(36).slice(0, 8);

const name = `esbuild-plugin-rdi-${uuid()}`;

export interface RDIPluginOptions {
  // dedupeUseEffect?: boolean;
  // dedupeUseState?: boolean;
  // dedupeUseCallback?: boolean;
  // dedupeUseMemo?: boolean;
  // dedupeUseRef?: boolean;
  // skipFiles?: string[];
  // skipFilesPattern?: RegExp;
}

const regExp2replace2GetVar0 = /(var |,)/;

const requireTokenRegExp = /require\(['"][^'"]*['"]\)/g;

const extractRequireTokenRegExp = /require\(['"]/g;

/** Removes a single token (e.g, require("react")) duplication from the file. */
const removeToken = (txt: string, token: string) => {
  const importRegExp = new RegExp(
    `(var |,)[a-zA-Z_$][\\w$]*=require\\(["']${token}["']\\)[;,]?`,
    "g",
  );
  const regExp2replace2GetVar = new RegExp(`[=]require\\(['"]${token}['"]\\)[;,]?`);

  const tokenMatches = txt.match(importRegExp);
  if (tokenMatches !== null && tokenMatches.length > 1) {
    const importVarName = tokenMatches[0]
      .replace(regExp2replace2GetVar, "")
      .replace(regExp2replace2GetVar0, "");
    for (let index = 1; index < tokenMatches.length; index++) {
      let token = tokenMatches[index];
      if (/^,.*,$/.test(token)) token = token.slice(1);
      else if (/^,.*;$/.test(token)) token = token.replace(";", "");
      else if (/^var .*,$/.test(token)) token = token.slice(4);
      txt = txt.replace(token, "");
      const v1 = tokenMatches[index]
        .replace(regExp2replace2GetVar, "")
        .replace(regExp2replace2GetVar0, "");
      txt = txt.replace(new RegExp(`(?<!--)\\b${v1}\\b`, "g"), importVarName);
    }
  }
  return txt;
};

/** Removes duplicate requires from a file. */
const removeDuplicateRequireFromFile = (txt: string) => {
  const requireTokenMatches = txt.match(requireTokenRegExp);
  const requireTokens =
    requireTokenMatches?.map(token => token.replace(extractRequireTokenRegExp, "").slice(0, -2)) ??
    [];

  // get unique tokens sorted
  const uniqueTokens = [...new Set(requireTokens)];
  uniqueTokens.sort((a, b) => b.length - a.length);

  for (const token of uniqueTokens) {
    txt = removeToken(txt, token);
  }

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
    ?.filter(f => !f.path.endsWith(".map") && !f.path.endsWith(".d.js"))
    .forEach(f => {
      let txt = f.text;

      /** remove empty file imports */
      txt = txt.replace(emptyChunkImportRegExp, "");

      /** remove extra jsx-runtime imports */
      if (f.path.endsWith(".js")) {
        txt = removeDuplicateRequireFromFile(txt);
      }
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

/** The plugin setup function */
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
export const rdiPlugin: (options?: RDIPluginOptions) => Plugin = (options = {}) => ({
  name,
  setup: build => setup(build, options),
});
