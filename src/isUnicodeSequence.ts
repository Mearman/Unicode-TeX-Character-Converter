import { PrefixedHexCodePoint } from "types/Hex";

export function isUnicodeSequence(
	codePoint: string
): codePoint is PrefixedHexCodePoint {
	return codePoint.match(/^U\+[0-9A-F]{4,6}$/i) !== null;
}
