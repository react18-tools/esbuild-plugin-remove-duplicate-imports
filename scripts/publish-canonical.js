// Publish canonical packages
[
  "esbuild-plugin-remove-duplicate-imports",
  "esbuild-plugin-remove-duplicate-require",
  "esbuild-plugin-remove-multiple-imports",
  "esbuild-plugin-remove-multiple-require",
  "esbuild-plugin-rdi",
].forEach(pkg => {
  execSync(`sed -i -e "s/name.*/name\\": \\"${pkg}\\",/" lib/package.json`);
  execSync("cd lib && npm publish --provenance --access public");
});
