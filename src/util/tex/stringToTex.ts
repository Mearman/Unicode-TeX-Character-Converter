import { Radix } from "../../types/radix";
import { getLatexRadixSymbol } from "../radix/getLatexRadixSymbol";

export function charToTex(input: string, radix: Radix = 16): string {
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

export function stringToTex(input: string, radix: Radix = 16): string {
	let result = "";
	for (const char of input) {
		result += charToTex(char, radix);
	}
	return result;
}

export function texSymbolToChar(input: string): string {
	const matches = input.match(/\\symbol\{((['"])(\d+))\}/);
	if (!matches) {
		throw new Error("Invalid input");
	}
	const radix = matches ? parseInt(matches[2]) : 10;
	const charCode = parseInt(matches[3], radix);
	return String.fromCharCode(charCode);
}
