import { PrefixedHexCodePoint } from "types/Hex";

export function isPrefixedHexCodePoint(
	codePoint: string
): codePoint is PrefixedHexCodePoint {
	return codePoint.match(/^U\+[0-9A-F]{4,6}$/i) !== null;
}
