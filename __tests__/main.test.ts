import { unicodeToTex } from "convert/unicodeToTex";
import assert from "node:assert";
import { describe, test } from "node:test";
import { codePointTexMap } from "../src/characters/codePointTexMap";
import { codepointToTex } from "../src/convert/codepointToTex";
import { codepointToUnicode } from "../src/convert/codepointToUnicode";
import { texToUnicode } from "../src/convert/texToUnicode";
import { unicodeToCodepoint } from "../src/convert/unicodeToCodepoint";
import { isPrefixedHexCodePoint } from "../src/isPrefixedHexCodePoint";
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

test("isCodePoint", () => {
	assert.ok(isPrefixedHexCodePoint("U+0041"));
	assert.ok(isPrefixedHexCodePoint("U+1F600"));
	assert.ok(isPrefixedHexCodePoint("U+10FFFF"));
});

describe("Encode unicode as codepoint", () => {
	const cases = ["β", "γ", "α"];
	for (const input of cases) {
		test(`should convert ${input} to codepoint`, () => {
			const codePoint = unicodeToCodepoint(input);
			console.debug(input, "->", codePoint);
			assert.notEqual(codePoint, input);
		});
	}
});

describe("Convert Hex Codepoint to Unicode", () => {
	const cases = ["U+03B1", "U+03B2", "U+03B3"];
	for (const input of cases) {
		test(`should convert ${input} to Unicode`, () => {
			const unicode = codepointToUnicode(input);
			console.debug(input, "->", unicode);
			assert.notEqual(input, unicode);
		});
	}
});

describe("Decode encode unicode round trip", async (t) => {
	for await (const key of Object.keys(codePointTexMap)) {
		test(`decode ${key} then encode`, async (t) => {
			const parsed = codepointToUnicode(key);
			const message = `${key} -> ${parsed}`;
			console.debug(message);
			assert.notEqual(key, parsed);
			const codepoint = unicodeToCodepoint(parsed);
			console.debug(parsed, "->", codepoint);
			assert.notEqual(parsed, codepoint);
			assert.strictEqual(key, codepoint);
		});
	}
});
/////////////////////////////////////////////////////////////////////
const cases: [string, string, string][] = [
	["α", "\\textalpha", "U+03B1"],
	["β", "\\textbeta", "U+03B2"],
	["γ", "\\textgamma", "U+03B3"],
];

describe("Unicode to Codepoint", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${char} to codepoint`, () => {
			const codePoint = unicodeToCodepoint(char);
			console.debug(char, "->", codePoint);
			assert.strictEqual(codePoint, uni);
		});
	}
});

describe("Unicode to Tex", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${char} to tex`, () => {
			const texChar = unicodeToTex(char);
			console.debug(char, "->", texChar);
			assert.strictEqual(texChar, tex);
		});
	}
});

describe("Tex to Unicode", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${tex} to unicode`, () => {
			const unicode = texToUnicode(tex);
			console.debug(tex, "->", unicode);
			assert.strictEqual(unicode, char);
		});
	}
});

describe("Codepoint to Unicode", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${uni} to unicode`, () => {
			const unicode = codepointToUnicode(uni);
			console.debug(uni, "->", unicode);
			assert.strictEqual(unicode, char);
		});
	}
});

describe("Codepoint to Tex", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${uni} to tex`, () => {
			const texChar = codepointToTex(uni);
			console.debug(uni, "->", texChar);
			assert.strictEqual(texChar, tex);
		});
	}
});

describe("Tex to Unicode", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${tex} to unicode`, () => {
			const unicode = texToUnicode(tex);
			console.debug(tex, "->", unicode);
			assert.strictEqual(unicode, char);
		});
	}
});

describe("Tex to Codepoint", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${tex} to codepoint`, () => {
			const codePoint = texToUnicode(tex);
			console.debug(tex, "->", codePoint);
			assert.strictEqual(codePoint, uni);
		});
	}
});
