import { codePointTex } from "./characters/unicode_to_tex";
import { isPrefixedHexCodePoint } from "./isPrefixedHexCodePoint";

export function convertCodepointToTex(
	unicode: string,
	index: number = 0
): string {
	unicode = unicode.trim();
	if (unicode === "") {
		throw new Error("Empty string");
	}
	// if (!isCodePoint(unicode)) {
	// 	let temp = unicode.codePointAt(0)!.toString(16).toUpperCase();
	// 	temp = `U+${temp}`;
	// 	console.debug(unicode, "->", temp);
	// 	unicode = temp;
	// }
	if (!isPrefixedHexCodePoint(unicode)) {
		throw new Error(`Invalid code point: ${unicode}`);
	}
	if (codePointTex[unicode]) {
		const tex = codePointTex[unicode];
		// const tex = Object.keys(codePointTex).find((key
		if (Array.isArray(tex)) {
			if (index < 0 || index >= tex.length) {
				throw new Error(`Invalid index: ${index}`);
			}
			return tex[index];
		}
		return tex;
	}
	return unicode;
}
