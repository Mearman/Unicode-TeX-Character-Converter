// import assert from "node:assert";
// import { describe, test } from "node:test";
import { codepointToUnicode } from "../src/convert/codepointToUnicode";
import { unicodeToCodepoint } from "../src/convert/unicodeToCodepoint";
import { decodeString } from "../src/util/decodeString";
import { encodeString } from "../src/util/encodeString";
import {
	ParsedLaTeXCommandAndValue,
	parseLatexCommands,
} from "../src/util/tex/isTexCommand";
// import { decodeString, encodeString } from "../src/main";
import { UnicodeTeXCommand } from "../src/util/UnicodeTeXCommand";
import { getLatexRadixSymbol } from "../src/util/radix/getLatexRadixSymbol";
import { charToTexSymbolCommand } from "../src/util/tex/charToTexSymbolCommand";
import { stringToTexSymbolCommand } from "../src/util/tex/stringToTex";
import { texSymbolCommandToChar } from "../src/util/tex/texSymbolCommandToChar";
// import assert from "assert";

/**
	- `α` -> `U+03B1`
	- `α` -> `\textalpha`
	- `U+03B1` -> `α`
	- `U+03B1` -> `\textalpha`.
	- `\textalpha` -> `α`
	- `\textalpha` -> `U+03B1`
 */

test("main", () => {
	// assert.strictEqual(1, 1);
	expect(1).toBe(1);
});

describe("string normalization methods", () => {
	const fixtures: { input: string }[] = [
		{
			input:
				"François, who lives in Zürich, enjoys reading Brontë novels and loves the café near the fjord.",
		},
	];
	const cases: {
		form: "NFC" | "NFD" | "NFKC" | "NFKD";
		expected: "same" | "different";
	}[] = [
		{ form: "NFC", expected: "same" },
		{ form: "NFD", expected: "different" },
		{ form: "NFKC", expected: "same" },
		{ form: "NFKD", expected: "different" },
	];

	describe.each(cases)("should normalize %s", ({ form, expected }) => {
		test.each(fixtures)(`should normalize "%s"`, ({ input }) => {
			const result = input.normalize(form).split("");
			console.debug(input, "--", form, "->", result);
			if (expected === "same") {
				expect(result).toEqual(input.split(""));
			} else {
				expect(result).not.toEqual(input.split(""));
			}
		});
	});
});

// test("isCodePoint", () => {
// 	assert.ok(isPrefixedHexCodePoint("U+0041"));
// 	assert.ok(isPrefixedHexCodePoint("U+1F600"));
// 	assert.ok(isPrefixedHexCodePoint("U+10FFFF"));
// });

describe("parseLatexCommand", () => {
	const fixtures: { input: string; expected: ParsedLaTeXCommandAndValue[] }[] =
		[
			{
				input:
					'\\beta \\beta \\beta{} {\\beta} \\beta{$char} \\"{$char} \\"{o} \\\'{u} \\c{c} \\beta asdasd\\beta{foo}asdasd \\beta {\\beta{bar}} {\\beta{$char}} {\\"{o}}',
				expected: [
					{
						commandName: "beta",
						bracketContents: undefined,
						startIndex: 0,
						endIndex: 5,
					},
					{
						commandName: "beta",
						bracketContents: undefined,
						startIndex: 6,
						endIndex: 11,
					},
					{
						bracketContents: undefined,
						commandName: "beta",
						endIndex: 19,
						startIndex: 12,
					},
					{
						bracketContents: undefined,
						commandName: "beta",
						endIndex: 27,
						startIndex: 20,
					},
					{
						bracketContents: "$char",
						commandName: "beta",
						endIndex: 40,
						startIndex: 28,
					},
					{
						bracketContents: "$char",
						commandName: '"',

						endIndex: 50,
						startIndex: 41,
					},
					{
						bracketContents: "o",
						commandName: '"',

						endIndex: 56,
						startIndex: 51,
					},
					{
						bracketContents: "u",
						commandName: "'",

						endIndex: 62,
						startIndex: 57,
					},
					{
						bracketContents: "c",
						commandName: "c",

						endIndex: 68,
						startIndex: 63,
					},
					{
						bracketContents: undefined,
						commandName: "beta",

						endIndex: 74,
						startIndex: 69,
					},
					{
						bracketContents: "foo",
						commandName: "beta",

						endIndex: 91,
						startIndex: 81,
					},
					{
						bracketContents: undefined,
						commandName: "beta",

						endIndex: 103,
						startIndex: 98,
					},
					{
						bracketContents: "bar",
						commandName: "beta",

						endIndex: 116,
						startIndex: 104,
					},
					{
						bracketContents: "$char",
						commandName: "beta",

						endIndex: 131,
						startIndex: 117,
					},
					{
						bracketContents: "o",
						commandName: '"',
						endIndex: 139,
						startIndex: 132,
					},
				],
			},
			{
				input: "\\textalpha",
				expected: [
					{
						commandName: "textalpha",
						startIndex: 0,
						endIndex: 10,
					},
				],
			},
			{
				input: '\\"{o}',
				expected: [
					{
						commandName: '"',
						bracketContents: "o",
						startIndex: 0,
						endIndex: 5,
					},
				],
			},
			{
				input: "o\\symbol{0361}o",
				expected: [
					{
						commandName: "symbol",
						bracketContents: "0361",
						startIndex: 1,
						endIndex: 14,
					},
				],
			},
			{
				input: "\\c{o}",
				expected: [
					{
						commandName: "c",
						bracketContents: "o",
						startIndex: 0,
						endIndex: 5,
					},
				],
			},
			{
				input: "\\beta",
				expected: [
					{
						commandName: "beta",
						startIndex: 0,
						endIndex: 5,
					},
				],
			},
			{
				input: "\\beta{}",
				expected: [
					{
						commandName: "beta",
						bracketContents: undefined,
						startIndex: 0,
						endIndex: 7,
					},
				],
			},
			{
				input: "{\\beta}",
				expected: [
					{
						commandName: "beta",
						bracketContents: undefined,
						startIndex: 0,
						endIndex: 7,
					},
				],
			},
			{
				input: "\\beta{$char}",
				expected: [
					{
						commandName: "beta",
						bracketContents: "$char",
						startIndex: 0,
						endIndex: 12,
					},
				],
			},
			{
				input: '\\"{$char}',
				expected: [
					{
						commandName: '"',
						bracketContents: "$char",
						startIndex: 0,
						endIndex: 9,
					},
				],
			},
			{
				input: '\\"{o}',
				expected: [
					{
						commandName: '"',
						bracketContents: "o",
						startIndex: 0,
						endIndex: 5,
					},
				],
			},
			{
				input: "\\'{u}",
				expected: [
					{
						commandName: "'",
						bracketContents: "u",
						startIndex: 0,
						endIndex: 5,
					},
				],
			},
			{
				input: "\\c{c}",
				expected: [
					{
						commandName: "c",
						bracketContents: "c",
						startIndex: 0,
						endIndex: 5,
					},
				],
			},
			{
				input: "foo\\beta{foo}bar",
				expected: [
					{
						commandName: "beta",
						bracketContents: "foo",
						startIndex: 3,
						endIndex: 13,
					},
				],
			},
			{
				input: "\\beta {\\beta{bar}}",
				expected: [
					{
						commandName: "beta",
						bracketContents: undefined,
						startIndex: 0,
						endIndex: 5,
					},
					{
						commandName: "beta",
						bracketContents: "bar",
						startIndex: 6,
						endIndex: 18,
					},
				],
			},
			{
				input: "{\\beta{$char}}",
				expected: [
					{
						commandName: "beta",
						bracketContents: "$char",
						startIndex: 0,
						endIndex: 14,
					},
				],
			},
			{
				input: '{\\"{o}}',
				expected: [
					{
						commandName: '"',
						bracketContents: "o",
						startIndex: 0,
						endIndex: 7,
					},
				],
			},
		];

	// for (const fixture of fixtures) {
	// 	test(`should parse ${fixture.input}`, () => {
	// 		const result = parseLatexCommand(fixture.input);
	// 		console.debug(fixture.input, "-->", result);
	// 		expect(result).toEqual(fixture.expected);
	// 	});
	// }

	// test.each(fixtures)("should parse %s", (fixture) => {
	// 	const result = parseLatexCommands(fixture.input);
	// 	console.debug(fixture.input, "-->", result);
	// 	expect(result).toEqual(fixture.expected);
	// });

	describe.each(fixtures)("should parse %s", ({ input, expected }) => {
		test("should parse", () => {
			const result = parseLatexCommands(input);
			console.debug(input, "-->", result);
			expect(result).toEqual(expected);
		});
	});
});

describe("Encode unicode as codepoint", () => {
	const cases = ["β", "γ", "α"];
	for (const input of cases) {
		test(`should convert ${input} to codepoint`, () => {
			const codePoint = unicodeToCodepoint(input);
			console.debug(input, "->", codePoint);
			// assert.notEqual(codePoint, input);
			expect(codePoint).not.toBe(input);
		});
	}
});

describe("Convert Hex Codepoint to Unicode", () => {
	const cases = ["U+03B1", "U+03B2", "U+03B3"];
	for (const input of cases) {
		test(`should convert ${input} to Unicode`, () => {
			const unicode = codepointToUnicode(input);
			console.debug(input, "->", unicode);
			// assert.notEqual(input, unicode);
			expect(unicode).not.toBe(input);
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
		// assert.strictEqual(getLatexRadixSymbol(16), '"');
		expect(getLatexRadixSymbol(16)).toBe('"');
	});
	test("should return ' for base 8", () => {
		// assert.strictEqual(getLatexRadixSymbol(8), "'");
		expect(getLatexRadixSymbol(8)).toBe("'");
	});
	test("should return '' for base 10", () => {
		// assert.strictEqual(getLatexRadixSymbol(10), "");
		expect(getLatexRadixSymbol(10)).toBe("");
	});
});

describe("Test all values in UnicodeLaTeXCommand", () => {
	describe("Combining Characters", () => {
		const combiningCharacters: UnicodeTeXCommand[] =
			UnicodeTeXCommand.getAllCombiningCharacters();

		test("should have length > 0", () => {
			expect(combiningCharacters.length).toBeGreaterThan(0);
		});

		describe.each(combiningCharacters)(
			"should be a combining character",
			(command) => {
				test(`"${command.commandNames[0]}" is combining character`, () => {
					expect(command.isCombiningCharacter()).toBe(true);
				});
			}
		);
		describe.each(combiningCharacters)(
			"should survive round trip",
			(command) => {
				test(`"${command.commandNames[0]}" should survive round trip`, () => {
					const value = UnicodeTeXCommand.toUnicode(command);
					const encoded = encodeString(value);
					expect(decodeString(encoded)).toBe(value);
					const decoded = decodeString(encoded);
					expect(decoded).toBe(value);
				});
			}
		);
	});
});
describe("\\symbol commands", () => {
	const fixtures: { input: string; expected: string }[] = [
		{ input: "α", expected: '\\symbol{"3B1}' },
		{ input: "β", expected: '\\symbol{"3B2}' },
		{ input: "ɣ", expected: '\\symbol{"263}' },
		{ input: "ɤ", expected: '\\symbol{"264}' },
	];

	// describe("charToTexSymbolCommand", () => {
	// 	test.each(fixtures)("should convert %s to tex", ({ input, expected }) => {
	// 		const result = charToTexSymbolCommand(input);
	// 		console.debug(input, "->", result);
	// 		expect(result).toBe(expected);
	// 	});
	// });
	// describe("stringToTexSymbolCommand", () => {
	// 	test.each(fixtures)("should convert %s to tex", ({ input, expected }) => {
	// 		const result = stringToTexSymbolCommand(input);
	// 		console.debug(input, "->", result);
	// 		expect(result).toBe(expected);
	// 	});
	// });
	describe.each(fixtures)("%s", ({ input, expected }) => {
		test(`charToTexSymbolCommand(${input})`, () => {
			const result = charToTexSymbolCommand(input);
			console.debug(input, "->", result);
			expect(result).toBe(expected);
		});

		test(`stringToTexSymbolCommand(${input})`, () => {
			const result = stringToTexSymbolCommand(input);
			console.debug(input, "->", result);
			expect(result).toBe(expected);
		});

		test(`texSymbolToChar(${input})`, () => {
			const result = texSymbolCommandToChar(expected);
			console.debug(expected, "->", input);
			expect(result).toBe(input);
		});
	});
});

describe("stringToTexSymbolCommand", () => {
	const fixtures: [string, string][] = [["go͡od", 'go\\symbol{"361}od']];
	for (const [char, tex] of fixtures) {
		test(`should convert ${char} to tex`, () => {
			const result = stringToTexSymbolCommand(char);
			console.debug(char, "->", result);
			// assert.strictEqual(result, tex);
			expect(result).toBe(tex);
		});
	}
});

describe("encodeString", () => {
	const fixtures: { name?: string; decoded: string; encoded: string }[] = [
		{
			name: "sentence containing accented characters",
			decoded:
				"François, who lives in Zürich, enjoys reading Brontë novels and loves the café near the fjord.",
			encoded:
				'Fran\\c{c}ois, who lives in Z\\"{u}rich, enjoys reading Bront\\"{e} novels and loves the caf\\\'{e} near the fjord.',
		},
		// {
		// 	decoded: "go͡od",
		// 	encoded: 'go\\symbol{"361}od',
		// 	// encoded: "g\\t{oo}d",
		// },
	];
	// for (let { name, decoded, encoded } of fixtures) {
	// 	// name ??= nameTest(decoded, encoded);
	// 	test("encode " + (name || nameTest(decoded, encoded)), () => {
	// 		const result = encodeString(decoded);
	// 		console.debug(decoded, "->", result);
	// 		expect(result).toBe(encoded);
	// 	});
	// 	test("decode " + (name ?? nameTest(encoded, decoded)), () => {
	// 		const result = decodeString(encoded);
	// 		console.debug(encoded, "->", result);
	// 		expect(result).toBe(decoded);
	// 	});
	// 	test("round trip " + (name ?? nameTest(encoded, decoded)), () => {
	// 		const encodedResult = encodeString(decoded);
	// 		console.debug(decoded, "->", encodedResult);
	// 		expect(encodedResult).toBe(encoded);
	// 		const decodedResult = decodeString(encodedResult);
	// 		console.debug(encodedResult, "->", decodedResult);
	// 		expect(decodedResult).toBe(decoded);
	// 	});
	// }
	describe.each(fixtures)("encode %s", ({ decoded, encoded }) => {
		test(`should encode "${encoded}"`, () => {
			const result = encodeString(decoded);
			console.debug(decoded, "->", result);
			expect(result).toBe(encoded);
		});

		test(`should decode "${decoded}"`, () => {
			const result = decodeString(encoded);
			console.debug(encoded, "->", result);
			expect(result).toBe(decoded);
		});

		test(`should round trip "${decoded}" -> "${encoded}" -> "${decoded}"`, () => {
			const encodedResult = encodeString(decoded);
			console.debug(decoded, "->", encodedResult);
			expect(encodedResult).toBe(encoded);
			const decodedResult = decodeString(encodedResult);
			console.debug(encodedResult, "->", decodedResult);
			expect(decodedResult).toBe(decoded);
		});
	});
});

describe("decodeString", () => {
	// Test fixtures
	const testCases: { input: string; expected: string }[] = [
		{ input: 'Hello \\symbol{"0041} World', expected: "Hello A World" },
		{ input: 'Some \\symbol{"0042} text', expected: "Some B text" },
		{
			input: 'Test \\symbol{"0031}\\symbol{"0032}\\symbol{"0033}',
			expected: "Test 123",
		},
		{
			input: 'Unicode \\symbol{"03B1}\\symbol{"03B2}\\symbol{"03B3}',
			expected: "Unicode αβγ",
		},
		{
			input: 'Mixed \\symbol{"0041}BCD E\\symbol{"0046}G',
			expected: "Mixed ABCD EFG",
		},
		{ input: "Just ASCII", expected: "Just ASCII" },
		{ input: "Empty string", expected: "Empty string" },
		{ input: '\\symbol{"005A}', expected: "Z" },
		{ input: 'No \\"{o} here', expected: "No ö here" },
		{ input: 'o\\symbol{"361}o', expected: "o͡o" },
	];

	// testCases.forEach(({ input, expected }) => {
	// 	test(`should decode ${input}`, () => {
	// 		const result = decodeString(input);
	// 		console.debug(input, "->", result);
	// 		expect(result).toBe(expected);
	// 	});
	// });
	test.each(testCases)("should decode %s", ({ input, expected }) => {
		const result = decodeString(input);
		console.debug(input, "->", result);
		expect(result).toBe(expected);
	});
});

function nameTest(decoded: string, encoded: string) {
	const decodedFirst3 = truncateString(decoded);
	const encodedFirstThree = truncateString(encoded);
	return `${decodedFirst3} to ${encodedFirstThree}`;
}

function truncateString(input: string) {
	return input
		.split(" ")
		.map((word, index) => {
			if (index < 3) {
				return word;
			} else if (index == 3) {
				return "...";
			} else {
				return;
			}
		})
		.filter(Boolean)
		.join(" ");
}

// ////////////////////////////////////////////////////////////
// test unicode ranges between 128 and 255
describe.each(Array.from({ length: 128 }, (_, i) => i + 128))(
	"unicode value %s",
	(code) => {
		test(`"${code}" roundtrip`, () => {
			const unicode = String.fromCharCode(code);
			const encoded = unicodeToCodepoint(unicode);
			const decoded = codepointToUnicode(encoded);
			console.debug(unicode, "->", encoded, "->", decoded);
			expect(decoded).toBe(unicode);
			expect(encoded).not.toBe(unicode);
		});
	}
);
