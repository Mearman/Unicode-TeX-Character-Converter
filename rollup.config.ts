import typescript from "@rollup/plugin-typescript";
import { resolve } from "node:path";
import { defineConfig, Plugin, PluginContext } from "rollup";
import dts from "rollup-plugin-dts";
import tsConfig from "./tsconfig.json" assert { type: "json" };

const production = !process.env.ROLLUP_WATCH;

export default defineConfig({
	plugins: [
		clean(),
		dts({
			compilerOptions: {
				baseUrl: tsConfig.compilerOptions.baseUrl,
				paths: tsConfig.compilerOptions.paths,
			},
		}),
		typescript({
			...tsConfig,
			exclude: ["rollup.config.ts", "__tests__/**"],
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
// function clean(): import("rollup").InputPluginOption {

// }
import fs from "fs";
import path from "path";

export function clean(
	options: {
		dir: string;
	} = {
		dir: "dist",
	}
): Plugin {
	return {
		name: "clean-dist",
		load(this: PluginContext, id: string) {
			// this.info({ message: "Hey", pluginCode: "LOAD" });
			// throw new Error("load");
		},
		buildStart(this: PluginContext) {
			const dirPath = path.resolve(options.dir);

			// if directory exists, delete it
			if (!fs.existsSync(dirPath)) {
				return;
			}
			this.warn({ message: `Cleaning ${dirPath}`, pluginCode: "CLEAN" });

			// list directoy contents
			const files = fs.readdirSync(dirPath);
			this.warn({ message: `Files: ${files.join(", ")}`, pluginCode: "CLEAN" });

			// remove directory
			fs.rmdirSync(dirPath, { recursive: true });
		},
	};
}
