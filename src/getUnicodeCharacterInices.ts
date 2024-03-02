import { isDoubleByte } from "convertCodepointToTex";

export function getUnicodeCharacterInices(str: string): number[] {
	const indices: number[] = [];
	for (var i = 0, n = str.length; i < n; i++) {
		if (isDoubleByte(str[i] as `${string}`)) {
			indices.push(i);
		}
	}
	return indices;
}
