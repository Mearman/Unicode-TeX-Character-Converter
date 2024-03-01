import { PrfixedHexCodePoint } from "types";

export function isPrefixedHexCodePoint(
	codePoint: string
): codePoint is PrfixedHexCodePoint {
	return codePoint.match(/^U\+[0-9A-F]{4,6}$/i) !== null;
}
