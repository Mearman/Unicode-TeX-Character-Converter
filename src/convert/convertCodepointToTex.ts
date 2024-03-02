import { Action, handleAction, Return, Throw } from "handleAction";
import { codePointTex } from "../characters/unicode_to_tex";
import { isPrefixedHexCodePoint } from "../isPrefixedHexCodePoint";

export function convertCodepointToTex(
	codepoint: `${string}`,
	index = 0,
	onInvalid: Action = Return,
	onNotFound: Action = Throw
) {
	codepoint = codepoint.trim();

	if (!isPrefixedHexCodePoint(codepoint)) {
		return handleAction(
			onInvalid,
			codepoint,
			codepoint,
			`Invalid code point: ${codepoint}`
		);
	}

	if (codePointTex[codepoint]) {
		const tex = codePointTex[codepoint];
		if (Array.isArray(tex)) {
			if (index < 0 || index >= tex.length) {
				throw new Error(`Invalid index: ${index}`);
			}
			return tex[index];
		}
		return tex;
	}

	return handleAction(
		onNotFound,
		codepoint,
		codepoint,
		`Tex not found for codepoint: ${codepoint}`
	);
}

