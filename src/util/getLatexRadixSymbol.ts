import { Radix } from "../types/radix";

export function getLatexRadixSymbol(base: Radix) {
	switch (base) {
		case 8:
			return "'";
		case 10:
			return "";
		case 16:
			return '"';
	}
}
