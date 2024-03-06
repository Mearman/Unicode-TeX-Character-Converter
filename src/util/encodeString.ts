import { Hexadecimal, Radix } from "../types/radix";
import { UnicodeLaTeXCommand } from "./UnicodeLaTeXCommand";
import { getLatexRadixSymbol } from "./radix/getLatexRadixSymbol";

export function encodeString(input: string, radix: Radix = Hexadecimal) {
	input = input.normalize("NFD");
	const radixSymbol = getLatexRadixSymbol(radix);
	let result = "";
	let skipNext = false;

	// for (let i = 0; i < input.length; i++) {
	// for (const [i, char] of input.split("")) {
	const split = input.split("");
	// split.forEach((char, i) => {
	for (let i = 0; i < split.length; i++) {
		const char = split[i];
		if (skipNext) {
			skipNext = false;
			continue;
			// break
			// return;
		}

		const isAsciiCharacter = char.codePointAt(0)! < 128;
		// const char = input[i];
		if (isAsciiCharacter) {
			result += char;
		} else {
			const charCode = char.codePointAt(0)!;
			const unicodeLatexCommand = UnicodeLaTeXCommand.codepoints.get(charCode);

			if (unicodeLatexCommand) {
				if (UnicodeLaTeXCommand.isCombiningCharacter(unicodeLatexCommand)) {
					// const nextChar = input[i + 1] || "";
					const parentChar = split[i - 1] || "";
					// const nextCharCode = nextChar.codePointAt(0)!.toString(radix);
					const command = unicodeLatexCommand.commands[0].replace(
						"$char",
						parentChar
					);
					// result += command;
					// replace last character in result
					result = result.slice(0, -1) + command;
					// skipNext = true;
				} else {
					result += unicodeLatexCommand.commands[0];
				}
			} else {
				// Use \symbol{codepoint} for characters without a specific LaTeX command
				result += `\\symbol{${radixSymbol}${charCode.toString(radix)}}`;
			}
		}
	}
	return result;
}
