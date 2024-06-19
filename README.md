# Esbuild Plugin Rdi <img src="https://github.com/react18-tools/esbuild-plugin-remove-duplicate-require/blob/main/popper.png?raw=true" style="height: 40px"/>

[![test](https://github.com/react18-tools/esbuild-plugin-remove-duplicate-require/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/esbuild-plugin-remove-duplicate-require/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/340147e152202fddb753/maintainability)](https://codeclimate.com/github/react18-tools/esbuild-plugin-remove-duplicate-require/maintainability) [![codecov](https://codecov.io/gh/react18-tools/esbuild-plugin-remove-duplicate-require/graph/badge.svg)](https://codecov.io/gh/react18-tools/esbuild-plugin-remove-duplicate-require) [![Version](https://img.shields.io/npm/v/esbuild-plugin-rdi.svg?colorB=green)](https://www.npmjs.com/package/esbuild-plugin-rdi) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/esbuild-plugin-rdi.svg)](https://www.npmjs.com/package/esbuild-plugin-rdi) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/esbuild-plugin-rdi) [![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

Esbuild Plugin Rdi is a comprehensive library designed to unlock the full potential of React 18 server components. It provides customizable loading animation components and a fullscreen loader container, seamlessly integrating with React and Next.js.

✅ Fully Treeshakable (import from `esbuild-plugin-rdi/client/loader-container`)

✅ Fully TypeScript Supported

✅ Leverages the power of React 18 Server components

✅ Compatible with all React 18 build systems/tools/frameworks

✅ Documented with [Typedoc](https://react18-tools.github.io/esbuild-plugin-remove-duplicate-require) ([Docs](https://react18-tools.github.io/esbuild-plugin-remove-duplicate-require))

✅ Examples for Next.js, Vite, and Remix

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

## Want Lite Version? [![npm bundle size](https://img.shields.io/bundlephobia/minzip/esbuild-plugin-rdi-lite)](https://www.npmjs.com/package/esbuild-plugin-rdi-lite) [![Version](https://img.shields.io/npm/v/esbuild-plugin-rdi-lite.svg?colorB=green)](https://www.npmjs.com/package/esbuild-plugin-rdi-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/esbuild-plugin-rdi-lite.svg)](https://www.npmjs.com/package/esbuild-plugin-rdi-lite)

```bash
$ pnpm add esbuild-plugin-rdi-lite
```

**or**

```bash
$ npm install esbuild-plugin-rdi-lite
```

**or**

```bash
$ yarn add esbuild-plugin-rdi-lite
```

> You need `r18gs` as a peer-dependency

### Import Styles

You can import styles globally or within specific components.

```css
/* globals.css */
@import "esbuild-plugin-rdi/dist";
```

```tsx
// layout.tsx
import "esbuild-plugin-rdi/dist/index.css";
```

For selective imports:

```css
/* globals.css */
@import "esbuild-plugin-rdi/dist/client"; /** required if you are using LoaderContainer */
@import "esbuild-plugin-rdi/dist/server/bars/bars1";
```

### Usage

Using loaders is straightforward.

```tsx
import { Bars1 } from "esbuild-plugin-rdi/dist/server/bars/bars1";

export default function MyComponent() {
  return someCondition ? <Bars1 /> : <>Something else...</>;
}
```

For detailed API and options, refer to [the API documentation](https://react18-tools.github.io/esbuild-plugin-remove-duplicate-require).

**Using LoaderContainer**

`LoaderContainer` is a fullscreen component. You can add this component directly in your layout and then use `useLoader` hook to toggle its visibility.

```tsx
// layout.tsx
<LoaderContainer />
	 ...
```

```tsx
// some other page or component
import { useLoader } from "esbuild-plugin-rdi/dist/hooks";

export default MyComponent() {
	const { setLoading } = useLoader();
	useCallback(()=>{
		setLoading(true);
		...do some work
		setLoading(false);
	}, [])
	...
}
```

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://github.com/react18-tools/esbuild-plugin-remove-duplicate-require/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsoring](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
