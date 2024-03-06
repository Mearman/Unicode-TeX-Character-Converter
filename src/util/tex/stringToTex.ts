import { Radix } from "../../types/radix";
import { charToTexSymbolCommand } from "./charToTexSymbolCommand";

export function stringToTexSymbolCommand(
	input: string,
	radix: Radix = 16
): string {
	let result = "";
	for (const char of input) {
		result += charToTexSymbolCommand(char, radix);
	}
	return result;
}


