import { codepointToUnicode } from "convert/codepointToUnicode";
import { texToCodepoint } from "convert/texToCodepoint";
import { texToUnicode } from "convert/texToUnicode";
import { unicodeToCodepoint } from "convert/unicodeToCodepoint";
import assert from "node:assert";
import { describe, test } from "node:test";
/**
	- `α` -> `U+03B1`
	- `α` -> `\textalpha`
	- `U+03B1` -> `α`
	- `U+03B1` -> `\textalpha`.
	- `\textalpha` -> `α`
	- `\textalpha` -> `U+03B1`
 */

test("main", () => {
	assert.strictEqual(1, 1);
});

// test("isCodePoint", () => {
// 	assert.ok(isPrefixedHexCodePoint("U+0041"));
// 	assert.ok(isPrefixedHexCodePoint("U+1F600"));
// 	assert.ok(isPrefixedHexCodePoint("U+10FFFF"));
// });

// describe("Encode unicode as codepoint", () => {
// 	const cases = ["β", "γ", "α"];
// 	for (const input of cases) {
// 		test(`should convert ${input} to codepoint`, () => {
// 			const codePoint = unicodeToCodepoint(input);
// 			console.debug(input, "->", codePoint);
// 			assert.notEqual(codePoint, input);
// 		});
// 	}
// });

// describe("Convert Hex Codepoint to Unicode", () => {
// 	const cases = ["U+03B1", "U+03B2", "U+03B3"];
// 	for (const input of cases) {
// 		test(`should convert ${input} to Unicode`, () => {
// 			const unicode = codepointToUnicode(input);
// 			console.debug(input, "->", unicode);
// 			assert.notEqual(input, unicode);
// 		});
// 	}
// });

// describe("Decode encode unicode round trip", async (t) => {
// 	for await (const key of Object.keys(codePointTexMap)) {
// 		test(`decode ${key} then encode`, async (t) => {
// 			const parsed = codepointToUnicode(key);
// 			const message = `${key} -> ${parsed}`;
// 			console.debug(message);
// 			assert.notEqual(key, parsed);
// 			const codepoint = unicodeToCodepoint(parsed);
// 			console.debug(parsed, "->", codepoint);
// 			assert.notEqual(parsed, codepoint);
// 			assert.strictEqual(key, codepoint);
// 		});
// 	}
// });

/////////////////////////////////////////////////////////////////////

const fixtures: [string, string, string][] = [
	["α", "\\textalpha", "U+03B1"],
	["β", "\\textbeta", "U+03B2"],
	["ɣ", "\\textgamma", "U+0263"],
];

/////////////////////////////////////////////////////////////////////

describe("Codepoint to Tex", () => {});

describe("Codepoint to Character", () => {
	for (const [char, , code] of fixtures) {
		test(`should convert ${code} to character`, () => {
			const result = codepointToUnicode(code);
			console.debug(char, "->", result);
			assert.strictEqual(result, char);
		});
	}
});

/////////////////////////////////////////////////////////////////////

describe("Tex to Codepoint", () => {
	for (const [, tex, code] of fixtures) {
		test(`should convert ${tex} to codepoint`, () => {
			const result = texToCodepoint(tex);
			console.debug(tex, "->", result);
			assert.strictEqual(result, code);
		});
	}
});

describe("Tex to Unicode", () => {
	for (const [char, tex] of fixtures) {
		test(`should convert ${tex} to character`, () => {
			const result = texToUnicode(tex);
			console.debug(tex, "->", result);
			assert.strictEqual(result, char);
		});
	}
});

/////////////////////////////////////////////////////////////////////

describe("Character to Codepoint", () => {
	for (const [char, , code] of fixtures) {
		test(`should convert ${char} to codepoint`, () => {
			const result = unicodeToCodepoint(char);
			console.debug(char, "->", result);
			assert.strictEqual(result, code);
		});
	}
});

describe("Character to Tex", () => {
	for (const [char, tex] of fixtures) {
	}
});

/////////////////////////////////////////////////////////////////////
