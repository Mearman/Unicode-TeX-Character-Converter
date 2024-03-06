import { LaTeXSymbolRadix } from "./getLatexRadixSymbol";

export function isLatexRadixSymbol(input: string): input is LaTeXSymbolRadix {
	return input === "'" || input === "" || input === '"';
}
