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


