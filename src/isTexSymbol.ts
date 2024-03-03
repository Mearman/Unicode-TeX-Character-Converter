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

export type OctalTexSymbol =
	`\\symbol{${OctalSymbol}${OctalChar}${OctalChar}${OctalChar}}`;

export type HexTexSymbol =
	`\\symbol{${HexSymbol}${HexChar}${HexChar}${HexChar}${HexChar}}`;

export type DecimalTexSymbol = `\\symbol{${number}}`;

export type TexSymbol = OctalTexSymbol | HexTexSymbol | DecimalTexSymbol;

export function isOctalChar(char: string): char is OctalChar {
	return /[0-7]/.test(char);
}

export function isHexChar(char: string): char is HexChar {
	return /[0-9A-F]/.test(char);
}

export function isRadixChar(char: string): char is RadixChar {
	return char === HexSymbol || char === OctalSymbol;
}

export function isHexTexSymbol(tex: string): tex is HexTexSymbol {
	return /\\symbol{"\d{4}}/.test(tex);
}

export function isOctalTexSymbol(tex: string): tex is OctalTexSymbol {
	return /\\symbol{'\d{3}}/.test(tex);
}

export function isDecimalTexSymbol(tex: string): tex is DecimalTexSymbol {
	return /\\symbol{\d{1,3}}/.test(tex);
}

export function isTexSymbol(tex: string): tex is TexSymbol {
	return (
		isOctalTexSymbol(tex) || isHexTexSymbol(tex) || isDecimalTexSymbol(tex)
	);
}
