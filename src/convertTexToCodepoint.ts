import { codePointTex } from "./characters/unicode_to_tex";

export function convertTexToUnicodeEscapeSequence(tex: string): string {
	for (const [unicode, texes] of Object.entries(codePointTex)) {
		if (Array.isArray(texes)) {
			if (texes.includes(tex)) {
				return unicode;
			}
		} else if (texes === tex) {
			return unicode;
		}
	}
	return tex;
}
