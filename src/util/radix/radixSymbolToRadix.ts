import { Radix } from "../../types/radix";
import { LaTeXSymbolRadix } from "./getLatexRadixSymbol";

export function radixSymbolToRadix(symbol: LaTeXSymbolRadix = ""): Radix {
	switch (symbol) {
		case "'":
			return 8;
		case "":
			return 10;
		case '"':
			return 16;
	}
}
