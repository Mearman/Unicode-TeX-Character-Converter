import { isDoubleByte } from "util/unicode/isDoubleByte";

export const stringContainsUnicodeCharacter = (str: string): boolean =>
	str.split("").some((char) => isDoubleByte(char as `${string}`));
