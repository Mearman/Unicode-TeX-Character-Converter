import { UnicodeTexCommandMappings } from "./UnicodeTexCommandMappings";
import {
	ParsedLaTeXCommandAndValue,
	isTexCommand,
	parseLatexCommands,
} from "./tex/isTexCommand";

export class UnicodeTeXCommand {
	static codepoints: Map<number, UnicodeTeXCommand> = new Map();
	static commands: Map<string, UnicodeTeXCommand> = new Map();
	static commandNames: Map<string, UnicodeTeXCommand> = new Map();
	commandNames: string[];

	static mappings: UnicodeTeXCommand[] = UnicodeTexCommandMappings;

	constructor(
		public readonly codepoint: number,
		public readonly description: string,
		public readonly commands: string[]
	) {
		if (!UnicodeTeXCommand.allLatexCommandsAreValid(this)) {
			throw new Error(
				`Invalid LaTeX commands for codepoint ${codepoint}: ${commands}`
			);
		}

		if (!UnicodeTeXCommand.hasCombiningOrStandaloneCommands(this)) {
			throw new Error(
				"All commands for a character must be exclusively combining or standalone"
			);
		}

		// throw error if codepoint or any of the commands already exist
		if (UnicodeTeXCommand.codepoints.has(codepoint)) {
			throw new Error(`Duplicate codepoint ${codepoint.toString(16)}`);
		}
		if (commands.some((command) => UnicodeTeXCommand.commands.has(command))) {
			throw new Error(`Duplicate command ${commands}`);
		}
		// this.commandName = [...new Set(commands.map((command) => parseLatexCommands(command).map((c) => c.commandName)).flat())]
		this.commandNames = commands
			.map((command) => parseLatexCommands(command).map((c) => c.commandName))
			.flat()
			// filter out duplicates
			.filter((commandName, i, names) => names.indexOf(commandName) === i);
		// if there is only one command, set it to a string, otherwise set it to an array
		this.commandNames.forEach((name) =>
			UnicodeTeXCommand.commandNames.set(name, this)
		);

		UnicodeTeXCommand.codepoints.set(codepoint, this);
		commands.forEach((command) =>
			UnicodeTeXCommand.commands.set(command, this)
		);
	}

	isCombiningCharacter(): this is UnicodeLaTeXCombiningCharacter {
		return UnicodeTeXCommand.isCombiningCharacter(this);
	}

	static getUnicodeLaTeXCommandFromParsedLaTeXCommand(
		obj: ParsedLaTeXCommandAndValue
	) {
		const result = UnicodeTeXCommand.commandNames.get(obj.commandName);
		if (result) {
			return result;
		} else {
			// throw new Error(`No LaTeX command found for ${obj.commandName}`);
			// if (obj.commandName === "symbol") {
			// 	return texSymbolCommandToChar(obj.bracketContents || "");
			// }
		}
	}

	static hasCombiningOrStandaloneCommands(character: UnicodeTeXCommand) {
		return (
			UnicodeTeXCommand.isCombiningCharacter(character) ||
			UnicodeTeXCommand.isStandaloneCharacter(character)
		);
	}

	static isStandaloneCharacter(character: UnicodeTeXCommand) {
		return character.commands.every(
			(command) => isTexCommand(command) && !command.includes("{$char}")
		);
	}

	isStandaloneCharacter(): this is UnicodeLaTeXStandaloneCharacter {
		return UnicodeTeXCommand.isStandaloneCharacter(this);
	}

	static isCombiningCharacter(character: UnicodeTeXCommand) {
		return character.commands.every(
			(command) => isTexCommand(command) && command.includes("{$char}")
		);
	}

	static allLatexCommandsAreValid(obj: UnicodeTeXCommand): boolean {
		return obj.commands.every((command) => isTexCommand(command));
		// return obj.commands.every((command) => /^\\
	}
	static instanceOfCombiningCharacter(
		obj: UnicodeTeXCommand
	): obj is UnicodeLaTeXCombiningCharacter {
		return UnicodeTeXCommand.isCombiningCharacter(obj);
	}

	static instanceOfStandaloneCharacter(
		obj: UnicodeTeXCommand
	): obj is UnicodeLaTeXStandaloneCharacter {
		return UnicodeTeXCommand.isStandaloneCharacter(obj);
	}
	static getCommandNames(obj: UnicodeTeXCommand) {
		return obj.commands.map(
			(command) => parseLatexCommands(command)[0].commandName
		);
	}
	static getBaseCommandNameAndValue(obj: UnicodeTeXCommand) {
		return obj.commands.map((command) => parseLatexCommands(command)[0]);
	}

	static isParsedLaTeXCommandCombiningCharacter(
		obj: ParsedLaTeXCommandAndValue
	): obj is ParsedLaTeXCommandAndValue {
		return UnicodeTeXCommand.instanceOfCombiningCharacter(
			UnicodeTeXCommand.getUnicodeCharacterFromParsedLaTexCommand(obj)
		);
	}

	static isParsedLaTeXCommandStandaloneCharacter(
		obj: ParsedLaTeXCommandAndValue
	): obj is ParsedLaTeXCommandAndValue {
		return UnicodeTeXCommand.instanceOfStandaloneCharacter(
			UnicodeTeXCommand.getUnicodeCharacterFromParsedLaTexCommand(obj)
		);
	}

	static getUnicodeCharacterFromParsedLaTexCommand(
		obj: ParsedLaTeXCommandAndValue
	): UnicodeLaTeXCombiningCharacter {
		const command = UnicodeTeXCommand.commandNames.get(obj.commandName);
		if (command) {
			return new UnicodeLaTeXCombiningCharacter(
				command.codepoint,
				command.description,
				command.commands
			);
		} else {
			throw new Error(`No LaTeX command found for ${obj.commandName}`);
		}
	}

	static toUnicode(
		command: UnicodeTeXCommand,
		combinedWith: string = ""
	): string {
		return (combinedWith + String.fromCodePoint(command.codepoint)).normalize();
	}

	static getAllCombiningCharacters(): UnicodeTeXCommand[] {
		const results: UnicodeTeXCommand[] = [];
		for (const command of UnicodeTeXCommand.codepoints.values()) {
			if (UnicodeTeXCommand.isCombiningCharacter(command)) {
				results.push(command);
			}
		}
		return results;
	}
}

export class UnicodeLaTeXCombiningCharacter extends UnicodeTeXCommand {}

export class UnicodeLaTeXStandaloneCharacter extends UnicodeTeXCommand {}
