import { UnicodeTeXCommand } from "./UnicodeTeXCommand";
import { isCombiningDiacritic } from "./isCombiningDiactricMark";

export function encodeForBib(str: string): string {
	return Array.from(str)
		.map((char) => {
			const normalised = char.normalize("NFD");
			// if (normalised.split("").join(" ") === char.split("").join(" ")) {
			if (normalised === char) {
				return char;
			} else {
				if (normalised.length == 2) {
					const modifier = normalised[1];
					if (isCombiningDiacritic(modifier)) {
						const unicodeTexCommandInstance = UnicodeTeXCommand.codepoints.get(
							modifier.codePointAt(0)!
						);
						const command = unicodeTexCommandInstance?.commandNames[0];
						if (!unicodeTexCommandInstance || !command) {
							throw new Error(`No LaTeX command found for ${modifier}`);
						}

						const base = normalised[0];
						const inter = /[A-Za-z]/.test(command) ? " " : "";
						const result = `{\\${command}${inter}${base}}`;
						return result;
					} else {
						// throw new Error(`Case not handlerd "${normalised}"`);
						return char;
					}
				} else {
					return char;
				}
			}
		})
		.join("");
}
