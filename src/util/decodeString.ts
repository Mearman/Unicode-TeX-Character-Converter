import { decodeLatexCommand } from "./decodeLatexCommand";
import {
	ParsedLaTeXCommandAndValue,
	parseLatexCommands,
} from "./tex/isTexCommand";

export function decodeString(encodedString: string): string {
	let decodedString = encodedString;

	const commands: ParsedLaTeXCommandAndValue[] =
		parseLatexCommands(encodedString);
	const decodedStrings: {
		value: string;
		indexStart: number;
		indexEnd: number;
	}[] = [];

	for (const command of commands) {
		const decodedChar = decodeLatexCommand(command);

		if (decodedChar) {
			decodedStrings.push({
				value: decodedChar,
				indexStart: command.startIndex,
				indexEnd: command.endIndex,
			});
		} else {
			throw new Error(`No LaTeX command found for ${command.commandName}`);
		}
	}

	// Replace LaTeX commands with their decoded values
	for (let i = decodedStrings.length - 1; i >= 0; i--) {
		const { value, indexStart, indexEnd } = decodedStrings[i];
		decodedString =
			decodedString.slice(0, indexStart) +
			value +
			decodedString.slice(indexEnd);
	}

	return decodedString;
}


"o͡o".normalize("NFD").split("").map(a => a.charCodeAt(0).toString(16)).join(" ")
