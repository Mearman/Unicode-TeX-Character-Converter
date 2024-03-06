import { Radix } from "../../types/radix";
import { getLatexRadixSymbol } from "../radix/getLatexRadixSymbol";

export function charToTexSymbolCommand(
	input: string,
	radix: Radix = 16
): string {
	if (input.length > 1) {
		throw new Error("Input must be a single character");
	}
	const normalised = input.normalize("NFD");
	let result = "";
	for (const char of normalised) {
		const charCode = char.charCodeAt(0);
		if (charCode > 127) {
			const latexRadixSymbol = getLatexRadixSymbol(radix);
			result += `\\symbol{${latexRadixSymbol}${charCode
				.toString(radix)
				.toUpperCase()}}`;
		} else {
			result += char;
		}
	}
	return result;
}
