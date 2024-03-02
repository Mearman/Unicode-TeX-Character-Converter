import { codePointTex } from "./characters/unicode_to_tex";
import { isPrefixedHexCodePoint } from "./isPrefixedHexCodePoint";

export const Ignore = "ignore";
export type Ignore = typeof Ignore;

export const Return = "return";
export type Return = typeof Return;

export const Throw = "throw";
export type Throw = typeof Throw;

export type Action = Throw | Ignore | Return | ((value: string) => string);

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

export function handleAction(
	action: Action,
	value: string,
	defaultValue = "",
	errorMessage = `Invalid value: ${value}`
) {
	switch (action) {
		case Throw:
			throw new Error(errorMessage);
		case Ignore:
			return defaultValue;
		case Return:
			return value;
		default:
			if (typeof action === "function") {
				return action(value);
			}
			return defaultValue;
	}
}

export function isDoubleByte(str: `${string}`) {
	if (str.length !== 1) {
		throw new Error(`Invalid double byte: ${str}`);
	}
	const charCode = str.charCodeAt(0);
	return charCode > 255;
}
export function stringComtainsUnicodeCharacter(str: string): boolean {
	for (var i = 0, n = str.length; i < n; i++) {
		if (isDoubleByte(str[i] as `${string}`)) {
			return true;
		}
	}
	return false;
}

export function isUnicodeCharacter(unicode: `${string}`): boolean {
	if (unicode.length !== 1) {
		throw new Error(`Invalid unicode character: ${unicode}`);
	}
	return isDoubleByte(unicode);
}
