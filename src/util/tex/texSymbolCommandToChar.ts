import { isLatexRadixSymbol } from "../radix/isLatexRadixSymbol";
import { radixSymbolToRadix } from "../radix/radixSymbolToRadix";
import { parseLatexCommands } from "./isTexCommand";

export function texSymbolCommandToChar(input: string): string {
	// const matches = input.match(/\\symbol\{((['"])(\d+))\}/);
	const commands = parseLatexCommands(input);
	const match = commands.find((command) => command.commandName === "symbol");
	if (!match) {
		throw new Error("Invalid input");
	}

	const valueString = match.bracketContents?.match(/[A-Z0-9]+/i);
	const radixSymbol = match.bracketContents?.match(/['"]/)?.[0] ?? "";
	if (!isLatexRadixSymbol(radixSymbol)) {
		throw new Error("Invalid radix symbol");
	}
	const radix = radixSymbolToRadix(radixSymbol);
	const value = parseInt(valueString?.[0] ?? "", radix);
	return String.fromCharCode(value);
}
