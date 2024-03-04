import { Action, Throw, handleAction } from "../util/handleAction";
import { isPrefixedHexCodePoint } from "../util/unicode/isPrefixedHexCodePoint";

export function codepointToUnicode(
	codePoint: `${string}`,
	onInvalid: Action = Throw
): string {
	if (!isPrefixedHexCodePoint(codePoint)) {
		return handleAction(onInvalid, codePoint);
	}
	return String.fromCodePoint(parseInt(codePoint.slice(2), 16));
}
