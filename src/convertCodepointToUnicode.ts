import { isPrefixedHexCodePoint } from "./isPrefixedHexCodePoint";

export function convertCodepointToUnicode(
	unicodeEscapeSequence: string
): string {
	if (!isPrefixedHexCodePoint(unicodeEscapeSequence)) {
		throw new Error(`Invalid code point: ${unicodeEscapeSequence}`);
	}
	return String.fromCodePoint(parseInt(unicodeEscapeSequence.slice(2), 16));
}
