import {
	isTexCommand,
	ParsedLaTeXCommandAndValue,
	parseLatexCommands,
} from "./tex/isTexCommand";

export class UnicodeTeXCommand {
	static codepoints: Map<number, UnicodeTeXCommand> = new Map();
	static commands: Map<string, UnicodeTeXCommand> = new Map();
	static commandNames: Map<string, UnicodeTeXCommand> = new Map();
	commandNames: string[];

	static mappings: UnicodeTeXCommand[] = [
		{
			codepoint: 272,
			description: "Đ as a standalone symbol",
			commands: ["\\DJ", "\\textcrD"],
		},
		{
			codepoint: 305,
			description: "ı as a standalone symbol",
			commands: [
				"\\i{}",
				"\\imath",
				"\\i",
				// "{\\i}"
			],
		},
		// {
		// 	codepoint: 583,
		// 	description: "cedilla",
		// 	commands: ["\\c{$char}"],
		// },
		{
			codepoint: 768,
			description: "Combining grave accent (̀)",
			commands: ["\\`{$char}"],
		},
		{
			codepoint: 769,
			description: "Combining acute accent (´)",
			commands: ["\\'{$char}"],
		},
		{
			codepoint: 770,
			description: "Combining circumflex accent (^)",
			commands: ["\\^{$char}"],
		},
		// {
		// 	codepoint: 770,
		// 	description: "̂ (Circumflex accent)",
		// 	commands: ["\\^{$char}"],
		// },
		{
			codepoint: 771,
			description: "Combining tilde (~)",
			commands: ["\\~{$char}"],
		},
		{
			codepoint: 772,
			description: "Combining macron (=)",
			commands: ["\\={$char}"],
		},
		{
			codepoint: 773,
			description: "Combining overline",
			commands: ["\\overline{$char}"],
		},
		{
			codepoint: 774,
			description: "Combining breve (u)",
			commands: ["\\u{$char}"],
		},
		{
			codepoint: 775,
			description: "Combining dot above (.)",
			commands: ["\\.{$char}"],
		},
		{
			commands: ['\\"{$char}'],
			codepoint: 776,
			description: "Combining diaeresis (¨)",
		},
		{
			codepoint: 777,
			description: "Combining hook above",
			commands: ["\\texthookabove{$char}"],
		},
		{
			codepoint: 778,
			description: "Combining ring above (r)",
			commands: ["\\r{$char}"],
		},
		{
			codepoint: 779,
			description: "Combining double acute accent (H)",
			commands: ["\\H{$char}"],
		},
		{
			codepoint: 780,
			description: "Combining caron (v)",
			commands: ["\\v{$char}"],
		},
		// {
		// 	codepoint: 781,
		// 	description: "Combining vertical line above",
		// 	commands: ["\\textvline{$char}"],
		// },
		// {
		// 	codepoint: 782,
		// 	description: "Combining double vertical line above",
		// 	commands: ["\\textvline{$char}"],
		// },
		{
			codepoint: 783,
			description: "Combining double grave accent",
			commands: ["\\textdoublegrave{$char}"],
		},
		{
			codepoint: 784,
			description: "Combining candrabindu",
			commands: ["\\textcandra{$char}"],
		},
		{
			codepoint: 785,
			description: "Combining inverted breve",
			commands: ["\\textinvbreve{$char}"],
		},
		{
			codepoint: 786,
			description: "Combining turned comma above",
			commands: ["\\textcommabelow{$char}"],
		},
		{
			codepoint: 787,
			description: "Combining comma above",
			commands: ["\\textcommaabove{$char}"],
		},
		{
			codepoint: 788,
			description: "Combining reversed comma above",
			commands: ["\\textreversedcomma{$char}"],
		},
		{
			codepoint: 789,
			description: "Combining comma above right",
			commands: ["\\textcommaaboveright{$char}"],
		},
		{
			codepoint: 790,
			description: "Combining grave accent below",
			commands: ["\\grave{$char}"],
		},
		{
			codepoint: 791,
			description: "Combining acute accent below",
			commands: ["\\acute{$char}"],
		},
		{
			codepoint: 792,
			description: "Combining left tack below",
			commands: ["\\texttackdown{$char}"],
		},
		// {
		// 	codepoint: 793,
		// 	description: "Combining right tack below",
		// 	commands: ["\\texttackup{$char}"],
		// },
		{
			codepoint: 794,
			description: "Combining left angle above",
			commands: ["\\textleftangle{$char}"],
		},
		{
			codepoint: 795,
			description: "Combining horn",
			commands: ["\\texthorn{$char}"],
		},
		// {
		// 	codepoint: 796,
		// 	description: "Combining left half ring below",
		// 	commands: ["\\leftharpoonaccent{$char}"],
		// },
		// {
		// 	codepoint: 797,
		// 	description: "Combining up tack below",
		// 	commands: ["\\texttackup{$char}"],
		// },
		// {
		// 	codepoint: 798,
		// 	description: "Combining vertical line below",
		// 	commands: ["\\textvline{$char}"],
		// },
		// {
		// 	codepoint: 799,
		// 	description: "Combining double vertical line below",
		// 	commands: ["\\textvline{$char}"],
		// },
		{
			codepoint: 800,
			description: "Combining left half ring above",
			commands: ["\\leftharpoonaccent{$char}"],
		},
		{
			codepoint: 801,
			description: "Combining palatalized hook below",
			commands: ["\\textpalhookbelow{$char}"],
		},
		{
			codepoint: 802,
			description: "Combining retroflex hook below",
			commands: ["\\textretroflexhookbelow{$char}"],
		},
		{
			codepoint: 803,
			description: "Combining dot below (d)",
			commands: ["\\d{$char}"],
		},
		{
			codepoint: 804,
			description: "Combining diaeresis below",
			commands: ["\\textdiaeresisbelow{$char}"],
		},
		{
			codepoint: 805,
			description: "Combining ring below",
			commands: ["\\textsubring{$char}"],
		},
		// {
		// 	codepoint: 806,
		// 	description: "Combining comma below (c)",
		// 	commands: ["\\c{$char}"],
		// },
		{
			codepoint: 807,
			description: "Combining cedilla (c)",
			commands: ["\\c{$char}"],
		},
		{
			codepoint: 808,
			description: "Combining ogonek (k)",
			commands: ["\\k{$char}"],
		},
		// {
		// 	codepoint: 809,
		// 	description: "Combining vertical line below",
		// 	commands: ["\\textvline{$char}"],
		// },
		{
			codepoint: 810,
			description: "Combining bridge below",
			commands: ["\\textbridgebelow{$char}"],
		},
		{
			codepoint: 811,
			description: "Combining inverted double arch below",
			commands: ["\\textdoublearchbelow{$char}"],
		},
		{
			codepoint: 812,
			description: "Combining caron below",
			commands: ["\\textcaronbelow{$char}"],
		},
		{
			codepoint: 813,
			description: "Combining circumflex accent below",
			commands: ["\\textcircumflexbelow{$char}"],
		},
		{
			codepoint: 814,
			description: "Combining breve below",
			commands: ["\\textbrevebelow{$char}"],
		},
		{
			codepoint: 815,
			description: "Combining inverted breve below",
			commands: ["\\textinvertedbrevebelow{$char}"],
		},
		{
			codepoint: 816,
			description: "Combining tilde below",
			commands: ["\\texttilde{$char}"],
		},
		{
			codepoint: 817,
			description: "Combining macron below (b)",
			commands: ["\\b{$char}"],
		},
		{
			codepoint: 818,
			description: "Combining low line",
			commands: ["\\textlowline{$char}"],
		},
		{
			codepoint: 819,
			description: "Combining double low line",
			commands: ["\\textdoublelowline{$char}"],
		},
		{
			codepoint: 820,
			description: "Combining tilde overlay",
			commands: ["\\texttildeoverlay{$char}"],
		},
		{
			codepoint: 821,
			description: "Combining short stroke overlay",
			commands: ["\\textshortstrokeoverlay{$char}"],
		},
		{
			codepoint: 822,
			description: "Combining long stroke overlay",
			commands: ["\\textlongstrokeoverlay{$char}"],
		},
		{
			codepoint: 823,
			description: "Combining short solidus overlay",
			commands: ["\\textshortsolidusoverlay{$char}"],
		},
		{
			codepoint: 824,
			description: "Combining long solidus overlay",
			commands: ["\\textlongsolidusoverlay{$char}"],
		},
		{
			codepoint: 825,
			description: "Combining right half ring below",
			commands: ["\\rightharpoonaccent{$char}"],
		},
		{
			codepoint: 826,
			description: "Combining inverted bridge below",
			commands: ["\\textinvertedbridgebelow{$char}"],
		},
		{
			codepoint: 827,
			description: "Combining square below",
			commands: ["\\textsquarebelow{$char}"],
		},
		{
			codepoint: 828,
			description: "Combining seagull below",
			commands: ["\\textseagullbelow{$char}"],
		},
		{
			codepoint: 829,
			description: "Combining x above",
			commands: ["\\textovercross{$char}"],
		},
		{
			codepoint: 830,
			description: "Combining vertical tilde",
			commands: ["\\textvtilde{$char}"],
		},
		{
			codepoint: 831,
			commands: ["\\textdoubleoverline{$char}"],
			description: "Combining double overline",
		},
		{
			codepoint: 832,
			description: "Combining grave tone mark",
			commands: ["\\textgravedbl{$char}"],
		},
		{
			codepoint: 833,
			description: "Combining acute tone mark",
			commands: ["\\textacutedbl{$char}"],
		},
		{
			codepoint: 834,
			description: "Combining greek perispomeni",
			commands: ["\\textperispomeni{$char}"],
		},
		{
			codepoint: 835,
			description: "Combining greek koronis",
			commands: ["\\textkoronis{$char}"],
		},
		// {
		// 	codepoint: 836,
		// 	description: "Combining greek dialytika tonos",
		// 	commands: ["\\textdialytikatonos{$char}"],
		// },
		{
			codepoint: 837,
			description: "Combining greek ypogegrammeni",
			commands: ["\\textsubl{$char}"],
		},
		{
			codepoint: 838,
			description: "Combining bridge above",
			commands: ["\\overbridge{$char}"],
		},
		// {
		// 	codepoint: 945,
		// 	commands: ["\\textalpha", "\\upalpha"],
		// 	description: "α",
		// },
		{
			codepoint: 945,
			description: "α as a standalone symbol",
			commands: ["\\textalpha", "\\alpha", "\\upalpha"],
		},
		{
			codepoint: 946,
			description: "β as a standalone symbol",
			commands: ["\\beta"],
		},
	].map(
		({
			codepoint,
			description,
			commands,
		}: Pick<UnicodeTeXCommand, "codepoint"> &
			Pick<UnicodeTeXCommand, "description"> &
			Pick<UnicodeTeXCommand, "commands">) =>
			new UnicodeTeXCommand(codepoint, description, commands)
	);

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
