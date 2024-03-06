import { Radix } from "../../types/radix";

export type LaTeXSymbolRadix = "'" | "" | '"';
export function getLatexRadixSymbol(base: Radix): LaTeXSymbolRadix {
	switch (base) {
		case 8:
			return "'";
		case 10:
			return "";
		case 16:
			return '"';
	}
}

export function radixSymbolToRadix(symbol: LaTeXSymbolRadix): Radix {
	switch (symbol) {
		case "'":
			return 8;
		case "":
			return 10;
		case '"':
			return 16;
	}
}
