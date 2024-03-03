import { Action, Throw, handleAction } from "util/handleAction";
import {
	OctalChar,
	HexChar,
	RadixChar,
	HexSymbol,
	OctalSymbol,
	HexTexSymbol,
	OctalTexSymbol,
	DecimalTexSymbol,
	TexSymbol,
	HexUnicodeValue,
	OctalUnicodeValue,
	DecimalUnicodeValue,
} from "util/hexSymbol";

import { Octal, Decimal } from "types/radix";

export function isOctalChar(char: string): char is OctalChar {
	return /[0-7]/.test(char);
}

export function isHexChar(char: string): char is HexChar {
	return /[0-9A-F]/.test(char);
}

export function isRadixChar(char: string): char is RadixChar {
	return char === HexSymbol || char === OctalSymbol;
}

export const HexTexSymbolRegex = /\\symbol{"\[0-9A-F]{4}}/;
export function isHexTexSymbol(tex: string): tex is HexTexSymbol {
	return HexTexSymbolRegex.test(tex);
}

export const OctalTexSymbolRegex = /\\symbol{'[0-7]{3}}/;
export function isOctalTexSymbol(tex: string): tex is OctalTexSymbol {
	return OctalTexSymbolRegex.test(tex);
}

export const DecimalTexSymbolRegex = /\\symbol{\d{1,3}}/;
export function isDecimalTexSymbol(tex: string): tex is DecimalTexSymbol {
	return DecimalTexSymbolRegex.test(tex);
}

export function isTexSymbol(tex: string): tex is TexSymbol {
	return (
		isOctalTexSymbol(tex) || isHexTexSymbol(tex) || isDecimalTexSymbol(tex)
	);
}

export function getTexSymbolValues(
	tex: TexSymbol,
	onInvalid: Action = Throw
):
	| [value: HexUnicodeValue, radix: Hex]
	| [value: OctalUnicodeValue, radix: Octal]
	| [value: DecimalUnicodeValue, radix: Decimal] {
	if (isOctalTexSymbol(tex)) {
		const value = parseInt(tex.slice(9, 12), 8);
		return [value];
	} else if (isHexTexSymbol(tex)) {
		const value = parseInt(tex.slice(9, 13), 16);
		return [value];
	} else if (isDecimalTexSymbol(tex)) {
		const value = parseInt(tex.slice(8, -1), 10);
		return [value];
	} else {
		return handleAction(onInvalid, tex);
	}
}

export function decodeString(input: string): string {}
