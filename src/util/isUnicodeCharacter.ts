export function isUnicodeCharacter(unicode: `${string}`): boolean {
	if (unicode.length !== 1) {
		throw new Error(`Invalid unicode character: ${unicode}`);
	}
	const charCode = unicode.charCodeAt(0);
	return charCode > 127;
}
