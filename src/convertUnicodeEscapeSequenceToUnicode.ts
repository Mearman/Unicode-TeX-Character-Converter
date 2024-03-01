import { isUnicodeSequence } from "./isUnicodeSequence";

export function convertUnicodeEscapeSequenceToUnicode(
	unicodeEscapeSequence: string
): string {
	if (!isUnicodeSequence(unicodeEscapeSequence)) {
		throw new Error(`Invalid code point: ${unicodeEscapeSequence}`);
	}
	return String.fromCodePoint(parseInt(unicodeEscapeSequence.slice(2), 16));
}
