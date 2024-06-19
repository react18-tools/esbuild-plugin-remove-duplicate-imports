import fs from "node:fs";
import path from "node:path";
import { describe, test } from "vitest";

/** testing tsup example (packages/shared) - make sure it is build before running this test suit
 *
 * These tests are not included in coverage as they do not invoke the source code directly. However, these tests are very important to ensure that the build outputs in dist directory are behaving as expected.
 */
describe.concurrent("Test plugin with default options in example build with tsup", () => {
  const exampleBuildDir = path.resolve(process.cwd(), "..", "packages", "shared", "dist");

  test("Should not contain duplicate require statements for a library", ({ expect }) => {
    const text = fs.readFileSync(path.resolve(exampleBuildDir, "index.js"), "utf-8");
    expect(text.match(/['"]react['"]/)?.length).toBe(1);
  });
});
