export function convertUnicodeToUnicodeToCodePoint(unicode: string): string {
	const length = unicode.length;
	if (length != 1) {
		throw new Error(`Invalid code point: ${unicode} length: ${length}`);
	}
	const codePoint = unicode.codePointAt(0);
	return `U+${codePoint?.toString(16).padStart(4, "0").toUpperCase()}`;
}
