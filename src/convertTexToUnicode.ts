import { convertCodepointToUnicode } from "convertCodepointToUnicode";
import { convertTexToCodepoint } from "convertTexToCodepoint";
import { isTexCommand } from "isTexCommand";

export function convertTexToUnicode(tex: string) {
	if (!isTexCommand(tex)) {
		return tex;
	}
	const codePoint = convertTexToCodepoint(tex);
	const unicode = convertCodepointToUnicode(codePoint);
	return unicode;
}
