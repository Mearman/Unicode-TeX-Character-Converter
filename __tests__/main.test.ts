import assert from "node:assert";
import { describe, test } from "node:test";
import { convertCodePointToUnicode } from "../src/convertCodePointToUnicode";
import { convertUnicodeToCodePoint } from "../src/convertUnicodeToCodePoint";
import { isPrefixedHexCodePoint } from "../src/isPrefixedHexCodePoint";

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
			// const codePoint = input.codePointAt(0)?.toString(16)
			// codepoint with padded zeros
			// const codePoint = input.codePointAt(0)?.toString(16).padStart(4, "0").toUpperCase();
			const codePoint = convertUnicodeToCodePoint(input);
			console.debug(input, "->", codePoint);
			assert.notEqual(codePoint, input);
		});
	}
});

describe("Convert Hex Codepoint to Unicode", () => {
	const cases = ["U+03B1", "U+03B2", "U+03B3"];
	for (const input of cases) {
		test(`should convert ${input} to Unicode`, () => {
			const unicode = convertCodePointToUnicode(input);
			console.debug(input, "->", unicode);
			assert.notEqual(input, unicode);
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
