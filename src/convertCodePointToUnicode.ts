import { isPrefixedHexCodePoint } from "./isPrefixedHexCodePoint";

export function convertCodePointToUnicode(codePoint: string): string {
	if (isPrefixedHexCodePoint(codePoint)) {
		return String.fromCodePoint(parseInt(codePoint.slice(2), 16));
	}
	return codePoint;
}
