import {
	Action,
	Discard,
	Return,
	Throw,
	handleAction,
} from "./util/handleAction";
import { texToUnicode } from "./convert/texToUnicode";
import { Hexadecimal, Radix } from "./types/radix";
import { unicodeToTex } from "./convert/unicodeToTex";
import { getLatexRadixSymbol } from "./util/radix/getLatexRadixSymbol";

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

export function decodeString(
	input: string,
	radix: Radix = Hexadecimal
): string {
	let result = "";
	let i = 0;
	while (i < input.length) {
		if (input[i] === "\\") {
			// Handle LaTeX command
			let commandEnd = input.indexOf("}", i);
			if (commandEnd === -1) {
				commandEnd = input.length;
			}
			const latexCommand = input.substring(i, commandEnd + 1);
			const unicodeChar = texToUnicode(latexCommand, Discard, Discard);
			if (unicodeChar) {
				result += unicodeChar;
			} else {
				result += decodeCharacter(latexCommand, radix);
			}
			i = commandEnd + 1;
		} else {
			// Handle normal ASCII character
			result += input[i];
			i++;
		}
	}
	return result;
}

export function isAsciiCharacter(char: string): boolean {
	if (char.length !== 1) {
		throw new Error(`Expected single character, got ${char.length} characters`);
	}
	const code = char.charCodeAt(0);
	return code < 128;
}

export function encodeString(
	input: string,
	radix: Radix = Hexadecimal
): string {
	let result = "";
	for (const char of input) {
		if (!isAsciiCharacter(char)) {
			// return encodeStringNonAscii(input, radix);
			const latexCommand = unicodeToTex(char, 0, Discard, Discard);
			if (latexCommand && !Array.isArray(latexCommand)) {
				result += latexCommand;
			} else if (latexCommand && Array.isArray(latexCommand)) {
				result += latexCommand[0];
			} else {
				const normalized = char.normalize("NFD");
				// let result = "";
				for (const n of normalized) {
					result += encodeCharacter(n, radix, Return, Return);
				}
			}
		} else {
			result += char;
		}
	}
	return result;
}

export function encodeCharacter(
	char: string,
	radix: Radix = Hexadecimal,
	onInvalid: Action = Throw,
	onNonUnicode: Action = Throw
): string {
	if (char.length !== 1) {
		return handleAction(onInvalid, char);
	}
	if (isAsciiCharacter(char)) {
		return handleAction(onNonUnicode, char);
	} else {
		const charCode = char.charCodeAt(0);
		const baseChar = getLatexRadixSymbol(radix);
		return `\\symbol{${baseChar}${charCode.toString(radix).toUpperCase()}}`;
	}
}
