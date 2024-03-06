import { isAsciiCharacter } from "util/isAsciiCharacter";
import { Hexadecimal, Radix } from "../types/radix";
import { Action, Throw, handleAction } from "./handleAction";
import { getLatexRadixSymbol } from "./radix/getLatexRadixSymbol";

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
