import { isTexCommand } from "isTexCommand";
import { codePointTex } from "./characters/unicode_to_tex";

export function convertTexToCodepoint(tex: string): string {
	if (!isTexCommand(tex)) {
		return tex;
	}
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
