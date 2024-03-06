import { UnicodeLaTeXCommand } from "./UnicodeLaTeXCommand";
import { ParsedLaTeXCommandAndValue } from "./tex/isTexCommand";
import { texSymbolCommandToChar } from "./tex/texSymbolCommandToChar";

export function decodeLatexCommand(command: ParsedLaTeXCommandAndValue) {
	const unicodeLatexCommand =
		UnicodeLaTeXCommand.getUnicodeLaTeXCommandFromParsedLaTeXCommand(command);
	if (unicodeLatexCommand) {
		if (unicodeLatexCommand.isCombiningCharacter()) {
			return UnicodeLaTeXCommand.toUnicode(
				unicodeLatexCommand,
				command.bracketContents
			);
		} else {
			return UnicodeLaTeXCommand.toUnicode(unicodeLatexCommand);
		}
	}
	if (command.commandName === "symbol" && command.bracketContents) {
		return texSymbolCommandToChar(`\\symbol{${command.bracketContents}}`);
	}
	throw new Error(`No LaTeX command found for ${command.commandName}`);
}
