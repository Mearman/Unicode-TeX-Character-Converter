import type { Config } from "@jest/types";
// Sync object
const nativeConfig: Config.InitialOptions = {
	verbose: true,
	testMatch: ["__tests__/**/*.test.ts"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
};

import type { JestConfigWithTsJest } from "ts-jest";

const jestConfigOne: JestConfigWithTsJest = {
	// [...]
	extensionsToTreatAsEsm: [".ts"],
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	transform: {
		// '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
		// '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				useESM: true,
			},
		],
	},
};

const jestConfig: JestConfigWithTsJest = {
	// [...]
	preset: "ts-jest/presets/default-esm", // or other ESM presets
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	transform: {
		// '^.+\\.[tj]sx?$' \\ to process js/ts with `ts-jest`
		//to process js/ts/mjs/mts with `ts-jest`
		"^.+\\.m?[tj]sx?$":
			// "^.+\\.tsx?$":
			[
				"ts-jest",
				{
					useESM: true,
				},
			],
	},
};

// export default nativeConfig;
// export default jestConfig;

// import { pathsToModuleNameMapper } from "ts-jest";
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
// import { compilerOptions } from "./tsconfig.json";
// import { compilerOptions } from "./tsconfig.json" assert { type: "json" };
// import type { JestConfigWithTsJest } from "ts-jest";

const jestConfigWithHelper: JestConfigWithTsJest = {
	preset: "ts-jest/presets/default-esm", // or other ESM presets
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],

	// [...]
	// roots: ["<rootDir>"],
	// modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
	// moduleNameMapper: pathsToModuleNameMapper(
	// 	compilerOptions.paths /*, { prefix: '<rootDir>/' } */
	// ),
};

export default jestConfigWithHelper;
