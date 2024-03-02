import { Action, Throw, handleAction } from "../handleAction";
import { isPrefixedHexCodePoint } from "../isPrefixedHexCodePoint";

export function codepointToUnicode(
	codePoint: `${string}`,
	onInvalid: Action = Throw
): string {
	if (!isPrefixedHexCodePoint(codePoint)) {
		return handleAction(onInvalid, codePoint);
	}
	return String.fromCodePoint(parseInt(codePoint.slice(2), 16));
}
