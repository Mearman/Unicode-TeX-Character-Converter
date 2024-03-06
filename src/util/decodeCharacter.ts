import { Hexadecimal, Radix } from "../types/radix";

export function decodeCharacter(
	encodedChar: string,
	radix: Radix = Hexadecimal
): string {
	const match = encodedChar.match(/\\symbol\{.([0-9A-F]+)\}/i);
	if (match && match[1]) {
		const charCode = parseInt(match[1], radix);
		return String.fromCharCode(charCode);
	} else {
		return encodedChar;
	}
}
