import { convertCodepointToUnicode } from "convert/convertCodepointToUnicode";
import { convertTexToCodepoint } from "convert/convertTexToCodepoint";
import { isTexCommand } from "isTexCommand";

export function convertTexToUnicode(tex: string) {
	if (!isTexCommand(tex)) {
		return tex;
	}
	const codePoint = convertTexToCodepoint(tex);
	const unicode = convertCodepointToUnicode(codePoint);
	return unicode;
}
