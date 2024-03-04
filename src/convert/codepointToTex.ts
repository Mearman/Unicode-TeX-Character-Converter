import { codePointTexMap } from "../characters/codePointTexMap";
import { Action, handleAction, Return, Throw } from "../util/handleAction";
import { isPrefixedHexCodePoint } from "../util/unicode/isPrefixedHexCodePoint";

export function codepointToTex(
	codepoint: `${string}`,
	index: number | "all" = 0,
	onInvalid: Action = Return,
	onNotFound: Action = Throw
) {
	codepoint = codepoint.trim();

	if (!isPrefixedHexCodePoint(codepoint)) {
		return handleAction(onInvalid, codepoint);
	}

	if (codePointTexMap[codepoint]) {
		const tex = codePointTexMap[codepoint];
		if (index == "all") {
			if (Array.isArray(tex)) {
				return tex;
			} else {
				return [tex];
			}
		}
		if (Array.isArray(tex)) {
			if (index < 0 || index >= tex.length) {
				throw new Error(`Invalid index: ${index}`);
			}
			return tex[index];
		}
		return tex;
	}

	return handleAction(onNotFound, codepoint);
}
