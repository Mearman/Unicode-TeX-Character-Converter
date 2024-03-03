export const HexSymbol = `"`;
export type HexSymbol = typeof HexSymbol;

export const OctalSymbol = `'`;
export type OctalSymbol = typeof OctalSymbol;

export type RadixChar = HexSymbol | OctalSymbol | "";

export type OctalChar = `0` | `1` | `2` | `3` | `4` | `5` | `6` | `7`;
export type HexChar =
	| `${OctalChar}`
	| `8`
	| `9`
	| `A`
	| `B`
	| `C`
	| `D`
	| `E`
	| `F`;

export type OctalUnicodeValue = `${OctalChar}${OctalChar}${OctalChar}`;
export type OctalTexSymbol =
	`\\symbol{${OctalSymbol}${OctalChar}${OctalChar}${OctalChar}}`;

export function isOctalUnicodeValue(
	value: string
): value is OctalUnicodeValue {
	return /^[0-7]{3}$/.test(value);
}

export type HexUnicodeValue = `${HexChar}${HexChar}${HexChar}${HexChar}`;
export type HexTexSymbol =
	`\\symbol{${HexSymbol}${HexChar}${HexChar}${HexChar}${HexChar}}`;

export function isHexUnicodeValue(value: string): value is HexUnicodeValue {
	return /^[0-9A-F]{4}$/.test(value);
}

export type DecimalUnicodeValue = `${number}${number}${number}`;
export type DecimalTexSymbol = `\\symbol{${number}${number}${number}}`;

export function isDecimalUnicodeValue(
	value: string
): value is DecimalUnicodeValue {
	return /^\d{3}$/.test(value);
}

export type TexSymbol = OctalTexSymbol | HexTexSymbol | DecimalTexSymbol;
