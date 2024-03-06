import { UnicodeLaTeXCommand } from "./UnicodeLaTeXCommand";
import { ParsedLaTeXCommandAndValue } from "./tex/isTexCommand";

export function decodeLatexCommand(command: ParsedLaTeXCommandAndValue) {
	const unicodeLatexCommand =
		UnicodeLaTeXCommand.getUnicodeLaTeXCommandFromParsedLaTeXCommand(command);
	if (unicodeLatexCommand.isCombiningCharacter()) {
		return UnicodeLaTeXCommand.toUnicode(
			unicodeLatexCommand,
			command.bracketContents
		);
	}
}
