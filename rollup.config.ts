import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { defineConfig, Plugin, PluginContext } from "rollup";
import pkg from "./package.json" assert { type: "json" };
import tsConfig from "./tsconfig.json" assert { type: "json" };
const production = !process.env.ROLLUP_WATCH;
const extensions = [".js", ".ts"];

export default defineConfig({
	plugins: [
		clean(),
		nodeResolve({ preferBuiltins: true, extensions }),
		typescript({
			...tsConfig,
			exclude: ["rollup.config.ts", "__tests__/**"],
			sourceMap: !production,
			inlineSources: !production,
		}),
	],
	input: "src/index.ts",
	output: [
		{
			format: "cjs",
			file: "dist/index.cjs.js",
			sourcemap: true,
		},
		{
			format: "esm",
			file: "dist/index.esm.js",
			sourcemap: true,
		},
		{
			format: "umd",
			file: "dist/index.umd.js",
			name: "unicode-tex-character-converter",
			sourcemap: true,
		},
		{
			format: "amd",
			file: "dist/index.amd.js",
			sourcemap: true,
		},
		{
			format: "system",
			file: "dist/index.system.js",
			sourcemap: true,
		},
		{
			format: "iife",
			file: "dist/index.iife.js",
			name: snakeCase(pkg.name),
			sourcemap: true,
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
function snakeCase(name: string): string {
	return name.replace(/-/g, "_");
}
