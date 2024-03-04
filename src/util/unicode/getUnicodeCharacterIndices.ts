import { isDoubleByte } from "util/unicode/isDoubleByte";

export const getUnicodeCharacterIndices = (str: string): number[] =>
	str
		.split("")
		.filter((char) => isDoubleByte(char as `${string}`))
		.map((_, i) => i);
