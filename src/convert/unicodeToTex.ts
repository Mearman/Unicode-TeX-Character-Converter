import { isUnicodeCharacter } from "../util/isUnicodeCharacter";
import { Action, Throw, handleAction } from "../util/handleAction";
import { codepointToTex } from "./codepointToTex";
import { unicodeToCodepoint } from "./unicodeToCodepoint";

export function unicodeToTex(
	char: `${string}`,
	index: number | "all" = 0,
	onInvalid: Action = Throw,
	onNotFound: Action = Throw
) {
	if (!isUnicodeCharacter(char)) {
		return handleAction(onInvalid, char);
	}
	const codePoint = unicodeToCodepoint(char, onInvalid);
	const result = codepointToTex(codePoint, index, onInvalid, onNotFound);
	if (index == "all") {
		if (!Array.isArray(result)) {
			return [result];
		} else {
			return result;
		}
	}
	return result;
}
