import { codePointTex } from "./characters/unicode_to_tex";
import { isPrefixedHexCodePoint } from "./isPrefixedHexCodePoint";

export function convertCodepointToTex(unicode: string): string {
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
		if (Array.isArray(tex)) {
			return tex[0];
		}
		return tex;
	}
	return unicode;
}
