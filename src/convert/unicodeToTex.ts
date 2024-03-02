import { isUnicodeCharacter } from "isUnicodeCharacter";
import { Action, Throw, handleAction } from "../handleAction";
import { codepointToTex } from "./codepointToTex";
import { unicodeToCodepoint } from "./unicodeToCodepoint";

export function unicodeToTex(
	char: `${string}`,
	index = 0,
	onInvalid: Action = Throw,
	onNotFound: Action = Throw
) {
	if (!isUnicodeCharacter(char)) {
		return handleAction(onInvalid, char);
	}
	const codePoint = unicodeToCodepoint(char, onInvalid);
	return codepointToTex(codePoint, index, onInvalid, onNotFound);
}
