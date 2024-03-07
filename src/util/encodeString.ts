import { Hexadecimal, Radix } from "../types/radix";
import { UnicodeTeXCommand } from "./UnicodeTeXCommand";
import { getLatexRadixSymbol } from "./radix/getLatexRadixSymbol";

export function encodeString(
	input: string,
	radix: Radix = Hexadecimal,
	wrap: boolean = false
) {
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
			const unicodeLatexCommand = UnicodeTeXCommand.codepoints.get(charCode);

			if (unicodeLatexCommand) {
				if (UnicodeTeXCommand.isCombiningCharacter(unicodeLatexCommand)) {
					// const nextChar = input[i + 1] || "";
					const parentChar = split[i - 1] || "";
					// const nextCharCode = nextChar.codePointAt(0)!.toString(radix);
					let command = unicodeLatexCommand.commands[0].replace(
						"$char",
						parentChar
					);
					if (wrap) {
						command = `{${command}}`;
					}
					// result += command;
					// replace last character in result
					result = result.slice(0, -1) + command;
					// skipNext = true;
				} else {
					let command = unicodeLatexCommand.commands[0];
					if (wrap) {
						command = `{${command}}`;
					}
					result += command;
				}
			} else {
				// Use \symbol{codepoint} for characters without a specific LaTeX command
				let command = `\\symbol{${radixSymbol}${charCode.toString(radix)}}`;
				if (wrap) {
					command = `{${command}}`;
				}
				result += command;
			}
		}
	}
	return result;
}
