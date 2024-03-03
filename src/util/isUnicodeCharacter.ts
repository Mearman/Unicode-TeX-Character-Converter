import { isDoubleByte } from "./isDoubleByte";

export function isUnicodeCharacter(unicode: `${string}`): boolean {
	if (unicode.length !== 1) {
		throw new Error(`Invalid unicode character: ${unicode}`);
	}
	return isDoubleByte(unicode);
}
