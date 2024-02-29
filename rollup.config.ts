import typescript from "@rollup/plugin-typescript";
import { resolve } from "node:path";
import { defineConfig } from "rollup";
import dts from "rollup-plugin-dts";
import tsConfig from "./tsconfig.json" assert { type: "json" };

const production = !process.env.ROLLUP_WATCH;

export default defineConfig({
	plugins: [
		dts({
			compilerOptions: {
				baseUrl: tsConfig.compilerOptions.baseUrl,
				paths: tsConfig.compilerOptions.paths,
			},
		}),
		typescript({
			...tsConfig,
			exclude: ["rollup.config.ts", "__tests__"],
			sourceMap: !production,
			inlineSources: !production,
		}),
	],
	input: resolve("src", "index.ts"),
	output: [
		{
			file: resolve("dist", "index.cjs.js"),
			format: "cjs",
		},
		{
			file: resolve("dist", "index.esm.js"),
			format: "es",
		},
		{
			file: resolve("dist", "index.umd.js"),
			format: "umd",
		},
		{
			file: resolve("dist", "index.iife.js"),
			format: "iife",
		},
	],

	watch: {
		clearScreen: false,
	},
});
