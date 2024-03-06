import { UnicodeTeXCommand } from "./UnicodeTeXCommand";
import { ParsedLaTeXCommandAndValue } from "./tex/isTexCommand";
import { texSymbolCommandToChar } from "./tex/texSymbolCommandToChar";

export function decodeLatexCommand(command: ParsedLaTeXCommandAndValue) {
	const unicodeLatexCommand =
		UnicodeTeXCommand.getUnicodeLaTeXCommandFromParsedLaTeXCommand(command);
	if (unicodeLatexCommand) {
		if (unicodeLatexCommand.isCombiningCharacter()) {
			return UnicodeTeXCommand.toUnicode(
				unicodeLatexCommand,
				command.bracketContents
			);
		} else {
			return UnicodeTeXCommand.toUnicode(unicodeLatexCommand);
		}
	}
	if (command.commandName === "symbol" && command.bracketContents) {
		return texSymbolCommandToChar(`\\symbol{${command.bracketContents}}`);
	}
	throw new Error(`No LaTeX command found for ${command.commandName}`);
}
