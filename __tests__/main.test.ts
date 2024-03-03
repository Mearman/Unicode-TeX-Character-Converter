
import assert from "node:assert";
import { describe, test } from "node:test";
import { codepointToUnicode } from "../src/convert/codepointToUnicode";
import { unicodeToCodepoint } from "../src/convert/unicodeToCodepoint";
import { getLatexRadixSymbol } from "../src/getLatexRadixSymbol";
import { charToTex, stringToTex } from "../src/stringToTex";
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

describe("Decode encode unicode round trip", () => {
	// for await (const key of Object.keys(codePointTexMap)) {
	// 	test(`decode ${key} then encode`, async () => {
	// const parsed = codepointToUnicode(key, Throw);
	// const message = `${key} -> ${parsed}`;
	// console.debug(message);
	// assert.notEqual(key, parsed);
	// 		const codepoint = unicodeToCodepoint(parsed);
	// 		console.debug(parsed, "->", codepoint);
	// 		assert.notEqual(parsed, codepoint);
	// 		assert.strictEqual(key, codepoint);
	// });
	// }
});

////////////////////////////////////////////////////////////

// describe("TeX string returns ", () => {
// 	describe("unicodeToTex", () => {
// 		describe("unicodeToTex should always return array when index is set to 'all'", () => {
// 			for (const fixture of fixtures) {
// 				const [char, tex, code] = fixture;
// 				const texCode = unicodeToTex(char, "all", Throw, Throw);
// 				test(`${char}`, () => {
// 					assert.notEqual(typeof texCode, "string");
// 					assert.ok(Array.isArray(texCode));
// 				});
// 			}
// 		});

// 		describe("unicodeToTex should always return string when index is provided", () => {
// 			for (const fixture of fixtures) {
// 				const [char, code] = fixture;
// 				const texCode = unicodeToTex(char, 0);
// 				test(`${char}`, () => {
// 					assert.ok(typeof texCode === "string");
// 				});
// 			}
// 		});
// 	});

// 	////////////////////////////////////////////////////////////

// 	describe("codepointToTex", () => {
// 		describe("codepointToTex should always return array when index is set to 'all'", () => {
// 			for (const fixture of fixtures) {
// 				const [char, tex, code] = fixture;
// 				const texCode = codepointToTex(code, "all", Throw, Throw);
// 				test(`${char}`, () => {
// 					assert.notEqual(typeof texCode, "string");
// 					assert.ok(Array.isArray(texCode));
// 				});
// 			}
// 		});

// 		describe("codepointToTex should always return string when index is provided", () => {
// 			for (const fixture of fixtures) {
// 				const [char, code] = fixture;
// 				const texCode = codepointToTex(code, 0);
// 				test(`${char}`, () => {
// 					assert.ok(typeof texCode === "string");
// 				});
// 			}
// 		});
// 	});
// });

// ////////////////////////////////////////////////////////////

// describe("From Codepoint", () => {
// 	describe("Codepoint to Tex", () => {
// 		for (const [, tex, code] of fixtures) {
// 			test(`should convert ${code} to tex`, () => {
// 				const result = codepointToTex(code);
// 				console.debug(code, "->", result);
// 				assert.strictEqual(result, tex);
// 			});
// 		}
// 	});

// 	describe("Codepoint to Character", () => {
// 		for (const [char, , code] of fixtures) {
// 			test(`should convert ${code} to character`, () => {
// 				const result = codepointToUnicode(code);
// 				console.debug(char, "->", result);
// 				assert.strictEqual(result, char);
// 			});
// 		}
// 	});
// });

// ////////////////////////////////////////////////////////////

// describe("From Tex", () => {
// 	describe("Tex to Codepoint", () => {
// 		for (const [, tex, code] of fixtures) {
// 			test(`should convert ${tex} to codepoint`, () => {
// 				const result = texToCodepoint(tex);
// 				console.debug(tex, "->", result);
// 				assert.strictEqual(result, code);
// 			});
// 		}
// 	});

// 	describe("Tex to Unicode", () => {
// 		for (const [char, tex] of fixtures) {
// 			test(`should convert ${tex} to character`, () => {
// 				const result = texToUnicode(tex);
// 				console.debug(tex, "->", result);
// 				assert.strictEqual(result, char);
// 			});
// 		}
// 	});
// });

// ////////////////////////////////////////////////////////////

// describe("From Character", () => {
// 	describe("Character to Codepoint", () => {
// 		for (const [char, , code] of fixtures) {
// 			test(`should convert ${char} to codepoint`, () => {
// 				const result = unicodeToCodepoint(char);
// 				console.debug(char, "->", result);
// 				assert.strictEqual(result, code);
// 			});
// 		}
// 	});

// 	describe("Character to Tex", (t) => {
// 		for (const [char, tex] of fixtures) {
// 			test(`should convert ${char} to tex`, (t) => {
// 				const result = unicodeToTex(char, "all");
// 				if (!Array.isArray(result)) {
// 					throw new Error(`Expected array, got ${typeof result}`);
// 				}

// 				console.debug(char, "->", result);
// 				assert.ok(result.includes(tex));
// 			});
// 		}
// 	});
// });

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// export function replaceNonAsciiWithLatexSymbol(
// 	input: string,
// 	radix: SymbolBase = 16
// ): string {
// 	// Normalize the string to separate base characters from combining marks
// 	const normalized = input.normalize("NFD");

// 	let result = "";

// 	for (const char of normalized) {
// 		const charCode = char.charCodeAt(0);

// 		// Check if the character is non-ASCII
// 		if (charCode > 127) {
// 			const baseChar = latexRadixSymbol(radix);
// 			// Replace non-ASCII character with \symbol{} and its Unicode code point in hexadecimal
// 			result += `\\symbol{${baseChar}${charCode
// 				.toString(radix)
// 				.toUpperCase()}}`;
// 		} else {
// 			// Add ASCII character to the result as is
// 			result += char;
// 		}
// 	}

// 	return result;
// }
////////////////////////////////////////////////////////////
/**
\`{o}	ò	grave accent
\'{o}	ó	acute accent
\^{o}	ô	circumflex
\"{o}	ö	umlaut, trema or dieresis
\H{o}	ő	long Hungarian umlaut (double acute)
\~{o}	õ	tilde
\c{c}	ç	cedilla
\k{a}	ą	ogonek
\l{}	ł	barred l (l with stroke)
\={o}	ō	macron accent (a bar over the letter)
\b{o}	o	bar under the letter
\.{o}	ȯ	dot over the letter
\d{u}	ụ	dot under the letter
\r{a}	å	ring over the letter (for å there is also the special command \aa)
\u{o}	ŏ	breve over the letter
\v{s}	š	caron/háček ("v") over the letter
\t{oo}	o͡o	"tie" (inverted u) over the two letters
\o{}	ø	slashed o (o with stroke)
{\i}	ı	dotless i (i without tittle)
 */
// const fixtures: [string, string, string][] = [
// 	// ["α", "\\textalpha", "U+03B1"],
// 	// ["β", "\\textbeta", "U+03B2"],
// 	// ["ɣ", "\\textgamma", "U+0263"],
// 	// ["ɤ", "\\textbabygamma", "U+0264"],
// 	["ò", "\\`{o}", "U+00F2"],
// 	["ó", "\\'{o}", "U+00F3"],
// 	["ô", "\\^{o}", "U+00F4"],
// 	["ö", '\\"{o}', "U+00F6"],
// 	["ő", "\\H{o}", "U+0151"],
// 	["õ", "\\~{o}", "U+00F5"],
// 	["ç", "\\c{c}", "U+00E7"],
// 	["ą", "\\k{a}", "U+0105"],
// 	["ł", "\\l{}", "U+0142"],
// 	["ō", "\\={o}", "U+014D"],
// 	["ȯ", "\\.{o}", "U+022F"],
// 	["ụ", "\\d{u}", "U+1EE5"],
// 	["å", "\\r{a}", "U+00E5"],
// 	["ŏ", "\\u{o}", "U+014F"],
// 	["š", "\\v{s}", "U+0161"],
// 	// ["o͡o", "\\t{oo}", "U+006F U+0361 U+006F"],
// 	["ø", "\\o{}", "U+00F8"],
// 	["ı", "{\\i}", "U+0131"],
// ];

// export function latexToUnicode(input: string): string {

describe("latexRadixSymbol", () => {
	test("should return ` for base 16", () => {
		assert.strictEqual(getLatexRadixSymbol(16), '"');
	});
	test("should return ' for base 8", () => {
		assert.strictEqual(getLatexRadixSymbol(8), "'");
	});
	test("should return '' for base 10", () => {
		assert.strictEqual(getLatexRadixSymbol(10), "");
	});
});

describe("characterToTex", () => {
	const fixtures: [string, string][] = [
		["α", '\\symbol{"3B1}'],
		["β", '\\symbol{"3B2}'],
		["ɣ", '\\symbol{"263}'],
		["ɤ", '\\symbol{"264}'],
	];
	for (const [char, tex] of fixtures) {
		test(`should convert ${char} to tex`, () => {
			const result = charToTex(char);
			console.debug(char, "->", result);
			assert.strictEqual(result, tex);
		});
	}
});
describe("stringToTex", () => {
	const fixtures: [string, string][] = [["go͡od", 'go\\symbol{"361}od']];
	for (const [char, tex] of fixtures) {
		test(`should convert ${char} to tex`, () => {
			const result = stringToTex(char);
			console.debug(char, "->", result);
			assert.strictEqual(result, tex);
		});
	}
});
