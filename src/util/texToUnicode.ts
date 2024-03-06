import { texToCodepoint } from "util/texToCodepoint";
import { codepointToUnicode } from "../convert/codepointToUnicode";
import { Action, Throw } from "./handleAction";
import { isTexCommand } from "./tex/isTexCommand";

export function texToUnicode(
	tex: `${string}`,
	onInvalid: Action = Throw,
	onNotFound: Action = Throw
) {
	if (!isTexCommand(tex)) {
		return tex;
	}
	const codePoint = texToCodepoint(tex, onInvalid, onNotFound);
	return codepointToUnicode(codePoint, onInvalid);
}
