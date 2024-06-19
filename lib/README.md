# Esbuild Plugin Remove Duplicate Imports <img src="https://github.com/react18-tools/esbuild-plugin-remove-duplicate-require/blob/main/popper.png?raw=true" style="height: 40px"/>

[![test](https://github.com/react18-tools/esbuild-plugin-remove-duplicate-require/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/esbuild-plugin-remove-duplicate-require/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/340147e152202fddb753/maintainability)](https://codeclimate.com/github/react18-tools/esbuild-plugin-remove-duplicate-require/maintainability) [![codecov](https://codecov.io/gh/react18-tools/esbuild-plugin-remove-duplicate-require/graph/badge.svg)](https://codecov.io/gh/react18-tools/esbuild-plugin-remove-duplicate-require) [![Version](https://img.shields.io/npm/v/esbuild-plugin-rdi.svg?colorB=green)](https://www.npmjs.com/package/esbuild-plugin-rdi) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/esbuild-plugin-rdi.svg)](https://www.npmjs.com/package/esbuild-plugin-rdi) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/esbuild-plugin-rdi) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

> ESBuild plugin to remove duplicate require statements from minified build.

> <img src="https://github.com/react18-tools/esbuild-plugin-remove-duplicate-require/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider starring [this repository](https://github.com/react18-tools/esbuild-plugin-remove-duplicate-require) and sharing it with your friends.

## Getting Started

### Installation

```bash
$ pnpm add esbuild-plugin-rdi
```

**_or_**

```bash
$ npm install esbuild-plugin-rdi
```

**_or_**

```bash
$ yarn add esbuild-plugin-rdi
```

> If you are using `monorepo` or `workspaces`, you can install this plugin to the root using `-w` or to a specific workspace using `--filter your-package` or `--scope your-package` for `pnpm` or `yarn` workspaces, respectively.

## Use with `tsup`

```ts
// tsup.config.ts or tsup.config.js
import { defineConfig } from "tsup";
import { rdiPlugin } from "esbuild-plugin-rdi";

export default defineConfig(options => ({
    ...
    esbuildPlugins:[rdiPlugin()]
}));
```

## Use with `esbuild`

```ts
import { rdiPlugin } from "esbuild-plugin-rdi";

esbuild.build({
	...
	plugins: [rdiPlugin()],
});
```

## Plugin Options

Coming soon...

### [🤩 Don't forget to star this repo!](https://github.com/react18-tools/esbuild-plugin-remove-duplicate-require)

> <img src="https://github.com/react18-tools/esbuild-plugin-remove-duplicate-require/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsoring](https://github.com/sponsors/mayank1513) our work.

![Alt](https://repobeats.axiom.co/api/embed/2f175594e854b83247faaac1a97abff3d8ce4699.svg "Repobeats analytics image")

## License

This library is licensed under the MPL-2.0 open-source license.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
