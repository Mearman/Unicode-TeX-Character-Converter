export function convertUnicodeToCodePoint(unicode: string): string {
	if (unicode.length === 1) {
		const codePoint = unicode
			.codePointAt(0)
			?.toString(16)
			.padStart(4, "0")
			.toUpperCase();
		return `U+${codePoint}`;
	}
	return unicode;
}
