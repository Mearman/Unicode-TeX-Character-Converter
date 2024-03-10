export const whiteSpaceCharacters: Map<number, string> = new Map([
	[0x0009, "Tab (HT)"],
	[0x000a, "Newline (LF)"],
	[0x000c, "Form Feed (FF)"],
	[0x000d, "Carriage Return (CR)"],
	[0x0020, "Space (SP)"],
	[0x00a0, "No-Break Space (NBSP)"],
	[0x1680, "Ogham Space Mark"],
	[0x2000, "En Quad"],
	[0x2001, "Em Quad"],
	[0x2002, "En Space"],
	[0x2003, "Em Space"],
	[0x2004, "Three-Per-Em Space"],
	[0x2005, "Four-Per-Em Space"],
	[0x2006, "Six-Per-Em Space"],
	[0x2007, "Figure Space"],
	[0x2008, "Punctuation Space"],
	[0x2009, "Thin Space"],
	[0x200a, "Hair Space"],
	[0x2028, "Line Separator (LS)"],
	[0x2029, "Paragraph Separator (PS)"],
	[0x202f, "Narrow No-Break Space (NNBSP)"],
	[0x205f, "Medium Mathematical Space (MMSP)"],
	[0x3000, "Ideographic Space"],
]);

/**
 * Cleans up whitespace in a given input string.
 * @param input - The input string to clean up.
 * @param singleLine - Optional. If true, newlines are replaced with a single space. Default is true.
 * @returns The cleaned up string with whitespace replaced.
 */
export function cleanWhiteSpace(
	input: string,
	singleLine: boolean = true
): string {
	input = input
		.split("\n")
		.map((line) => line.trim())
		.join("\n");

	// if singleLine is true, newlines are replaced with a single space
	if (singleLine) {
		input = input.replace(/\s+/g, " ");
	} else {
		// any instance of one or more whitespace characters is replaced with a single space but newline characters are retained
		input = input.replace(/[^\S\n\r]+/g, " ");
		// any instance of two or more newline characters is replaced with a single newline character
		// input = input.replace(/\n{2,}/g, "\n");
		input = input.replace(/\n+/g, "\n");
	}
	return input;
}
