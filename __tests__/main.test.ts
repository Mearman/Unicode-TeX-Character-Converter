import { convertCodepointToTex } from "convertCodepointToTex";
import { convertTexToUnicode } from "convertTexToUnicode";
import assert from "node:assert";
import { describe, test } from "node:test";
import { codePointTex } from "../src/characters/unicode_to_tex";
import { convertCodepointToUnicode } from "../src/convertCodepointToUnicode";
import { convertUnicodeToCodepoint } from "../src/convertUnicodeToCodepoint";
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
			const codePoint = convertUnicodeToCodepoint(input);
			console.debug(input, "->", codePoint);
			assert.notEqual(codePoint, input);
		});
	}
});

describe("Convert Hex Codepoint to Unicode", () => {
	const cases = ["U+03B1", "U+03B2", "U+03B3"];
	for (const input of cases) {
		test(`should convert ${input} to Unicode`, () => {
			const unicode = convertCodepointToUnicode(input);
			console.debug(input, "->", unicode);
			assert.notEqual(input, unicode);
		});
	}
});

describe("Decode encode unicode round trip", async (t) => {
	for await (const key of Object.keys(codePointTex)) {
		test(`decode ${key} then encode`, async (t) => {
			const parsed = convertCodepointToUnicode(key);
			const message = `${key} -> ${parsed}`;
			console.debug(message);
			assert.notEqual(key, parsed);
			const codepoint = convertUnicodeToCodepoint(parsed);
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
			const codePoint = convertUnicodeToCodepoint(char);
			console.debug(char, "->", codePoint);
			assert.strictEqual(codePoint, uni);
		});
	}
});

describe("Unicode to Tex", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${char} to tex`, () => {
			const texChar = convertCodepointToTex(char);
			console.debug(char, "->", texChar);
			assert.strictEqual(texChar, tex);
		});
	}
});

describe("Tex to Unicode", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${tex} to unicode`, () => {
			const unicode = convertTexToUnicode(tex);
			console.debug(tex, "->", unicode);
			assert.strictEqual(unicode, char);
		});
	}
});

describe("Codepoint to Unicode", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${uni} to unicode`, () => {
			const unicode = convertCodepointToUnicode(uni);
			console.debug(uni, "->", unicode);
			assert.strictEqual(unicode, char);
		});
	}
});

describe("Codepoint to Tex", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${uni} to tex`, () => {
			const texChar = convertCodepointToTex(uni);
			console.debug(uni, "->", texChar);
			assert.strictEqual(texChar, tex);
		});
	}
});

describe("Tex to Unicode", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${tex} to unicode`, () => {
			const unicode = convertTexToUnicode(tex);
			console.debug(tex, "->", unicode);
			assert.strictEqual(unicode, char);
		});
	}
});

describe("Tex to Codepoint", () => {
	for (const [char, tex, uni] of cases) {
		test(`should convert ${tex} to codepoint`, () => {
			const codePoint = convertTexToUnicode(tex);
			console.debug(tex, "->", codePoint);
			assert.strictEqual(codePoint, uni);
		});
	}
});

// describe("unicodeToTex", () => {
// 	// count up sequentially in hex
// 	// for (let i = 0; i < 0x10ffff; i++) {
// 	for (let i = 0x0020; i < 0xFFFD; i++) {
// 		const hex = i.toString(16);
// 		const codePoint = `U+${hex}`;
// 		// console.debug(`codePoint: ${codePoint}`);
// 		console.debug(hex, "->", codePoint, "=", String.fromCodePoint(i));
// 		const tex = convertCodepointToTex(codePoint);
// 		console.debug(`tex: ${tex}`);
// 		// test(`should convert ${hex} to ${tex}`, () => {
// 		// 	assert.notEqual(codePoint, tex);
// 		// });
// 	}
// })
// describe("texToUnicode", () => {
// 	test("should convert valid TeX characters to Unicode", () => {
// 		assert.strictEqual(texToUnicode("\\alpha"), "U+03B1");
// 		assert.strictEqual(texToUnicode("\\beta"), "β");
// 		assert.strictEqual(texToUnicode("\\gamma"), "γ");
// 	});

// 	test("should return the input if no conversion is found", () => {
// 		assert.strictEqual(texToUnicode(""), "");
// 		assert.strictEqual(texToUnicode("abc"), "abc");
// 		assert.strictEqual(texToUnicode("\\alpha\\beta\\gamma"), "αβγ");
// 	});
// });

// describe("Unicode to Tex", () => {
// 	test("should convert valid Unicode characters to TeX", () => {
// 		assert.strictEqual(texToUnicode("α"), "\\alpha");
// 		assert.strictEqual(texToUnicode("β"), "\\beta");
// 		assert.strictEqual(texToUnicode("γ"), "\\gamma");
// 	});

// 	test("should return the input if no conversion is found", () => {
// 		assert.strictEqual(texToUnicode(""), "");
// 		assert.strictEqual(texToUnicode("abc"), "abc");
// 		assert.strictEqual(texToUnicode("αβγ"), "αβγ");
// 	});
// });
