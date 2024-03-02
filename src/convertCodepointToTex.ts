import { codePointTex } from "./characters/unicode_to_tex";
import { isPrefixedHexCodePoint } from "./isPrefixedHexCodePoint";

export function convertCodepointToTex(
	codepoint: string,
	index: number = 0,
	onInvalid:
		| "throw"
		| "return"
		| "ignore"
		| ((unicode: string) => string) = "return",
	onNotFound:
		| "throw"
		| "return"
		| "ignore"
		| ((unicode: string) => string) = "throw"
): string {
	codepoint = codepoint.trim();

	if (!isPrefixedHexCodePoint(codepoint)) {
		return handleAction(codepoint, onInvalid);
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

	return handleAction(codepoint, onNotFound);
}

function handleAction(
	codepoint: string,
	action: "throw" | "return" | "ignore" | ((unicode: string) => string)
): string {
	if (action === "throw") {
		throw new Error(`Action failed for codepoint: ${codepoint}`);
	}
	if (action === "ignore") {
		return "";
	}
	if (typeof action === "function") {
		return action(codepoint);
	}
	return codepoint;
}

export function isDoubleByte(str: `${string}`) {
	// for (var i = 0, n = str.length; i < n; i++) {
	// 	if (str.charCodeAt(i) > 255) {
	// 		return true;
	// 	}
	// }
	// return false;
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
