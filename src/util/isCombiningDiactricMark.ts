export function isCombiningDiacritic(modifier: string): boolean {
	const codePoint = modifier.codePointAt(0)!;
	return codePoint >= 0x0300 && codePoint <= 0x036f;
}
