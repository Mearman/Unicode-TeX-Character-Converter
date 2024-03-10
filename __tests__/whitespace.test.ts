import { cleanWhiteSpace, whiteSpaceCharacters } from "../src/util/whitespace";

describe("whiteSpaceCharacters", () => {
	test.each(Array.from(whiteSpaceCharacters.entries()))(
		`"%d": "%s" is regocnized as whitespace by regex`,
		(codepoint, description) => {
			const whitespace = String.fromCodePoint(codepoint);
			expect(/\s/.test("a")).toBe(false);
			expect(/\s/.test(whitespace)).toBe(true);
		}
	);
});

describe("whiteSpaceCharacters", () => {
	test.each(Array.from(whiteSpaceCharacters.entries()))(
		`"%d": "%s" is recognized as whitespace by regex`,
		(codepoint, description) => {
			const whitespace = String.fromCodePoint(codepoint);
			expect(/\s/.test("a")).toBe(false);
			expect(/\s/.test(whitespace)).toBe(true);
		}
	);
});

describe("cleanWhiteSpace", () => {
	test("should replace newlines with a single space when singleLine is true", () => {
		const input = "Hello\nWorld";
		const expected = "Hello World";
		const result = cleanWhiteSpace(input, true);
		expect(result).toBe(expected);
	});

	test("should replace multiple whitespace characters with a single space", () => {
		const input = "Hello     World";
		const expected = "Hello World";
		const result = cleanWhiteSpace(input);
		expect(result).toBe(expected);
	});

	test("should not modify the input when singleLine is false", () => {
		const input = "Hello\nWorld";
		const expected = "Hello\nWorld";
		const result = cleanWhiteSpace(input, false);
		expect(result).toBe(expected);
	});
	test("should reduce multiple newlines to a single newline when singleLine is false", () => {
		const input = "Hello\n\n\nWorld";
		const expected = "Hello\nWorld";
		const result = cleanWhiteSpace(input, false);
		expect(result).toBe(expected);
	});
	test("should trim leading and trailing whitespace from each line", () => {
		const input = "Hello  \n\n\nWorld";
		const expected = "Hello\nWorld";
		const result = cleanWhiteSpace(input, false);
		expect(result).toBe(expected);
	});

	test("should trim leading and trailing whitespace", () => {
		const input = "  Hello  World  ";
		const expected = "Hello World";
		const result = cleanWhiteSpace(input);
		expect(result).toBe(expected);
	});
});
