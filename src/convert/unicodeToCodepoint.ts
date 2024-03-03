import { Action, Throw, handleAction } from "util/handleAction";
import { isUnicodeCharacter } from "util/isUnicodeCharacter";

export function unicodeToCodepoint(
	unicode: `${string}`,
	onInvalid: Action = Throw
) {
	if (!isUnicodeCharacter(unicode)) {
		return handleAction(onInvalid, unicode);
	}
	const codePoint = unicode.codePointAt(0);
	return `U+${codePoint?.toString(16).padStart(4, "0").toUpperCase()}`;
}
