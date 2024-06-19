import fs from "node:fs";
import path from "node:path";
import { describe, test, beforeAll } from "vitest";
import esbuild from "esbuild";
import { rdiPlugin, RDIPluginOptions } from "../src";
import glob from "tiny-glob";
import cssPlugin from "esbuild-plugin-react18-css";

const outDirPrefix = "./__tests__/build/";
const srcPattern = "../packages/shared/src/**/*.*";

/** Utility funciton to create build options and buildDir */
async function createEsBUildOptions(
  outDir: string,
  pluginOptions?: RDIPluginOptions,
): Promise<esbuild.BuildOptions & { buildDir: string }> {
  const buildDir = path.resolve(__dirname, "build", outDir);
  try {
    fs.rmSync(buildDir, { recursive: true });
    fs.unlinkSync(buildDir);
  } catch {}
  return {
    format: "cjs",
    target: "es2019",
    sourcemap: false,
    bundle: true,
    minify: true,
    plugins: [rdiPlugin(pluginOptions), cssPlugin()],
    entryPoints: await glob(srcPattern),
    external: ["react", "react-dom"],
    outdir: outDirPrefix + outDir,
    buildDir,
  };
}

describe.concurrent("Test plugin with ESBuild with default options", async () => {
  const { buildDir, ...options } = await createEsBUildOptions("default-options");

  beforeAll(async () => {
    await esbuild.build(options);
  });

  test("Should not contain duplicate require statements for a library", ({ expect }) => {
    const text = fs.readFileSync(path.resolve(buildDir, "index.js"), "utf-8");
    expect(text.match(/['"]react['"]/)?.length).toBe(1);
  });
});
