import {
	EscapeCharacterMap,
	replaceAllEscapedWithUnescaped,
	replaceAllUnescapedWithEscaped,
} from "../src/util/escapeCharacters";

const entries = Array.from(EscapeCharacterMap.entries());

describe.each(entries)(`"%s": "%s"`, (unescaped, escaped) => {
	const f = {
		escaped: createStringVariants(escaped),
		unescaped: createStringVariants(unescaped),
		mixed: createStringVariants(unescaped, escaped),
	};
	describe("replaceAllEscapedWithUnescaped", () => {
		describe("contiguous", () => {
			describe("escaped", () => {
				test(`"${f.escaped.contiguous}" -> "${f.unescaped.contiguous}"`, () => {
					const result = replaceAllEscapedWithUnescaped(f.escaped.contiguous);
					expect(result).toBe(f.unescaped.contiguous);
				});
			});
			describe("unescaped", () => {
				test(`"${f.unescaped.contiguous}" -> "${f.unescaped.contiguous}"`, () => {
					const result = replaceAllEscapedWithUnescaped(f.unescaped.contiguous);
					expect(result).toBe(f.unescaped.contiguous);
				});
			});
			describe("mixed", () => {
				test(`"${f.mixed.contiguous}" -> "${f.unescaped.contiguous}"`, () => {
					const result = replaceAllEscapedWithUnescaped(f.mixed.contiguous);
					expect(result).toBe(f.unescaped.contiguous);
				});
			});
		});
		describe("non-contiguous", () => {
			describe("escaped", () => {
				test(`"${f.escaped.nonContiguous}" -> "${f.unescaped.nonContiguous}"`, () => {
					const result = replaceAllEscapedWithUnescaped(
						f.escaped.nonContiguous
					);
					expect(result).toBe(f.unescaped.nonContiguous);
				});
			});
			describe("unescaped", () => {
				test(`"${f.unescaped.nonContiguous}" -> "${f.unescaped.nonContiguous}"`, () => {
					const result = replaceAllEscapedWithUnescaped(
						f.unescaped.nonContiguous
					);
					expect(result).toBe(f.unescaped.nonContiguous);
				});
			});
			describe("mixed", () => {
				test(`"${f.mixed.nonContiguous}" -> "${f.unescaped.nonContiguous}"`, () => {
					const result = replaceAllEscapedWithUnescaped(f.mixed.nonContiguous);
					expect(result).toBe(f.unescaped.nonContiguous);
				});
			});
		});
	});
	describe("replaceAllUnescapedWithEscaped", () => {
		describe("contiguous", () => {
			describe("escaped", () => {
				test(`"${f.escaped.contiguous}" -> "${f.escaped.contiguous}"`, () => {
					const result = replaceAllUnescapedWithEscaped(f.escaped.contiguous);
					expect(result).toBe(f.escaped.contiguous);
				});
			});
			describe("unescaped", () => {
				test(`"${f.unescaped.contiguous}" -> "${f.escaped.contiguous}"`, () => {
					const result = replaceAllUnescapedWithEscaped(f.unescaped.contiguous);
					expect(result).toBe(f.escaped.contiguous);
				});
			});
			describe("mixed", () => {
				test(`"${f.mixed.contiguous}" -> "${f.escaped.contiguous}"`, () => {
					const result = replaceAllUnescapedWithEscaped(f.mixed.contiguous);
					expect(result).toBe(f.escaped.contiguous);
				});
			});
		});
		describe("non-contiguous", () => {
			describe("escaped", () => {
				test(`"${f.escaped.nonContiguous}" -> "${f.escaped.nonContiguous}"`, () => {
					const result = replaceAllUnescapedWithEscaped(
						f.escaped.nonContiguous
					);
					expect(result).toBe(f.escaped.nonContiguous);
				});
			});
			describe("unescaped", () => {
				test(`"${f.unescaped.nonContiguous}" -> "${f.escaped.nonContiguous}"`, () => {
					const result = replaceAllUnescapedWithEscaped(
						f.unescaped.nonContiguous
					);
					expect(result).toBe(f.escaped.nonContiguous);
				});
			});
			describe("mixed", () => {
				test(`"${f.mixed.nonContiguous}" -> "${f.escaped.nonContiguous}"`, () => {
					const result = replaceAllUnescapedWithEscaped(f.mixed.nonContiguous);
					expect(result).toBe(f.escaped.nonContiguous);
				});
			});
		});
	});
});

export function createStringVariants(...input: string[]): {
	contiguous: string;
	nonContiguous: string;
} {
	// if count of input is only 1, duplicate it
	if (input.length === 1) input.push(input[0]);
	const contiguous = input.join("foo");
	const nonContiguous = input.join(" foo ");
	return { contiguous, nonContiguous };
}
