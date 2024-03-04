// https://en.wikipedia.org/wiki/Combining_character
// https://en.wikipedia.org/wiki/Combining_Diacritical_Marks
export function isCombiningDiactric(char: string): boolean {
	if (char.length !== 1) {
		throw new Error(`Expected single character, got ${char.length} characters`);
	}
	char = char.normalize("NFD");
	return char.charCodeAt(0) >= 0x300 && char.charCodeAt(0) <= 0x36f;
}
