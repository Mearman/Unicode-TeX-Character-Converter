import { Action, Throw } from "../handleAction";
import { isTexCommand } from "../isTexCommand";
import { codepointToUnicode } from "./codepointToUnicode";
import { texToCodepoint } from "./texToCodepoint";

export function texToUnicode(
	tex: `${string}`,
	onInvalid: Action = Throw,
	onNotFound: Action = Throw
) {
	if (!isTexCommand(tex)) {
		return tex;
	}
	const codePoint = texToCodepoint(tex, onInvalid, onNotFound);
	const unicode = codepointToUnicode(codePoint, onInvalid);
	return unicode;
}
