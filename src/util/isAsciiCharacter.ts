export function isAsciiCharacter(char: string): boolean {
	if (char.length !== 1) {
		throw new Error(`Expected single character, got ${char.length} characters`);
	}
	const code = char.charCodeAt(0);
	return code < 128;
}
