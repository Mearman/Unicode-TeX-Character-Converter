export type HexLetter = "A" | "B" | "C" | "D" | "E" | "F";
export type HexNumber =
	| "0"
	| "1"
	| "2"
	| "3"
	| "4"
	| "5"
	| "6"
	| "7"
	| "8"
	| "9";
export type HexSymbol = HexNumber | HexLetter;
export type HexCodePoint = `${HexSymbol}${HexSymbol}${HexSymbol}${HexSymbol}`;
export type PrefixedHexCodePoint = `U+${HexCodePoint}`;
