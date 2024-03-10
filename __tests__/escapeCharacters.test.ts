import {
	EscapeCharacterMap,
	fromEscaped,
	toEscaped,
} from "../src/util/escapeCharacters";

describe("escapeCharacters", () => {
	describe("fromEscaped", () => {
		describe.each(Array.from(EscapeCharacterMap.entries()))(
			"",
			(unescaped, escaped) => {
				test(`should return ${unescaped} for ${escaped}`, () => {
					expect(fromEscaped(escaped)).toBe(unescaped);
				});
				test(`should return ${escaped} for ${unescaped}`, () => {
					expect(toEscaped(unescaped)).toBe(escaped);
				});
			}
		);
	});
});
