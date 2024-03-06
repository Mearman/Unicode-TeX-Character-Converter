import {
	ParsedLaTeXCommandAndValue,
	isTexCommand,
	parseLatexCommands,
} from "./tex/isTexCommand";

export class UnicodeLaTeXCommand {
	static codepoints: Map<number, UnicodeLaTeXCommand> = new Map();
	static commands: Map<string, UnicodeLaTeXCommand> = new Map();
	static commandNames: Map<string, UnicodeLaTeXCommand> = new Map();
	commandNames: string[];

	private static mappings: UnicodeLaTeXCommand[] = [
		{
			codepoint: 945,
			description: "α as a standalone symbol",
			commands: ["\\textalpha", "\\alpha", "\\upalpha"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 946,
			description: "β as a standalone symbol",
			commands: ["\\beta"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x0302,
		// 	description: "̂ (Circumflex accent)",
		// 	commands: ["\\^{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 272,
			description: "Đ as a standalone symbol",
			commands: ["\\DJ", "\\textcrD"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 305,
			description: "ı as a standalone symbol",
			commands: [
				"\\i{}",
				"\\imath",
				"\\i",
				// "{\\i}"
			],
		} satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	description: "cedilla",
		// 	commands: ["\\c{$char}"],
		// 	codepoint: 0x0247,
		// } satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 768,
			description: "Combining grave accent (̀)",
			commands: ["\\`{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 769,
			description: "Combining acute accent (´)",
			commands: ["\\'{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 770,
			description: "Combining circumflex accent (^)",
			commands: ["\\^{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 771,
			description: "Combining tilde (~)",
			commands: ["\\~{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 772,
			description: "Combining macron (=)",
			commands: ["\\={$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 773,
			description: "Combining overline",
			commands: ["\\overline{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 774,
			description: "Combining breve (u)",
			commands: ["\\u{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 775,
			description: "Combining dot above (.)",
			commands: ["\\.{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			commands: ['\\"{$char}'],
			codepoint: 776,
			description: "Combining diaeresis (¨)",
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 777,
			description: "Combining hook above",
			commands: ["\\texthookabove{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 778,
			description: "Combining ring above (r)",
			commands: ["\\r{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 779,
			description: "Combining double acute accent (H)",
			commands: ["\\H{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 780,
			description: "Combining caron (v)",
			commands: ["\\v{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x030d,
		// 	description: "Combining vertical line above",
		// 	commands: ["\\textvline{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x030e,
		// 	description: "Combining double vertical line above",
		// 	commands: ["\\textvline{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 783,
			description: "Combining double grave accent",
			commands: ["\\textdoublegrave{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 784,
			description: "Combining candrabindu",
			commands: ["\\textcandra{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 785,
			description: "Combining inverted breve",
			commands: ["\\textinvbreve{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 786,
			description: "Combining turned comma above",
			commands: ["\\textcommabelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 787,
			description: "Combining comma above",
			commands: ["\\textcommaabove{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 788,
			description: "Combining reversed comma above",
			commands: ["\\textreversedcomma{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 789,
			description: "Combining comma above right",
			commands: ["\\textcommaaboveright{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 790,
			description: "Combining grave accent below",
			commands: ["\\grave{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 791,
			description: "Combining acute accent below",
			commands: ["\\acute{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 792,
			description: "Combining left tack below",
			commands: ["\\texttackdown{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x0319,
		// 	description: "Combining right tack below",
		// 	commands: ["\\texttackup{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 794,
			description: "Combining left angle above",
			commands: ["\\textleftangle{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 795,
			description: "Combining horn",
			commands: ["\\texthorn{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x031c,
		// 	description: "Combining left half ring below",
		// 	commands: ["\\leftharpoonaccent{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x031d,
		// 	description: "Combining up tack below",
		// 	commands: ["\\texttackup{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x031e,
		// 	description: "Combining vertical line below",
		// 	commands: ["\\textvline{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x031f,
		// 	description: "Combining double vertical line below",
		// 	commands: ["\\textvline{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x0320,
		// 	description: "Combining left half ring above",
		// 	commands: ["\\leftharpoonaccent{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 801,
			description: "Combining palatalized hook below",
			commands: ["\\textpalhookbelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 802,
			description: "Combining retroflex hook below",
			commands: ["\\textretroflexhookbelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 803,
			description: "Combining dot below (d)",
			commands: ["\\d{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 804,
			description: "Combining diaeresis below",
			commands: ["\\textdiaeresisbelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 805,
			description: "Combining ring below",
			commands: ["\\textsubring{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x0326,
		// 	description: "Combining comma below (c)",
		// 	commands: ["\\c{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 807,
			description: "Combining cedilla (c)",
			commands: ["\\c{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 808,
			description: "Combining ogonek (k)",
			commands: ["\\k{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x0329,
		// 	description: "Combining vertical line below",
		// 	commands: ["\\textvline{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 810,
			description: "Combining bridge below",
			commands: ["\\textbridgebelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 811,
			description: "Combining inverted double arch below",
			commands: ["\\textdoublearchbelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 812,
			description: "Combining caron below",
			commands: ["\\textcaronbelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 813,
			description: "Combining circumflex accent below",
			commands: ["\\textcircumflexbelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 814,
			description: "Combining breve below",
			commands: ["\\textbrevebelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 815,
			description: "Combining inverted breve below",
			commands: ["\\textinvertedbrevebelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 816,
			description: "Combining tilde below",
			commands: ["\\texttilde{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 817,
			description: "Combining macron below (b)",
			commands: ["\\b{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 818,
			description: "Combining low line",
			commands: ["\\textlowline{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 819,
			description: "Combining double low line",
			commands: ["\\textdoublelowline{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 820,
			description: "Combining tilde overlay",
			commands: ["\\texttildeoverlay{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 821,
			description: "Combining short stroke overlay",
			commands: ["\\textshortstrokeoverlay{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 822,
			description: "Combining long stroke overlay",
			commands: ["\\textlongstrokeoverlay{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 823,
			description: "Combining short solidus overlay",
			commands: ["\\textshortsolidusoverlay{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 824,
			description: "Combining long solidus overlay",
			commands: ["\\textlongsolidusoverlay{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 825,
			description: "Combining right half ring below",
			commands: ["\\rightharpoonaccent{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 826,
			description: "Combining inverted bridge below",
			commands: ["\\textinvertedbridgebelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 827,
			description: "Combining square below",
			commands: ["\\textsquarebelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 828,
			description: "Combining seagull below",
			commands: ["\\textseagullbelow{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 829,
			description: "Combining x above",
			commands: ["\\textovercross{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x033e,
		// 	description: "Combining vertical tilde",
		// 	commands: ["\\textvtilde{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 831,
			description: "Combining double overline",
			commands: ["\\textdoubleoverline{$char}"],
		} satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x0340,
		// 	description: "Combining grave tone mark",
		// 	commands: ["\\textgravedbl{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x0341,
		// 	description: "Combining acute tone mark",
		// 	commands: ["\\textacutedbl{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x0342,
		// 	description: "Combining greek perispomeni",
		// 	commands: ["\\textperispomeni{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x0343,
		// 	description: "Combining greek koronis",
		// 	commands: ["\\textkoronis{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x0344,
		// 	description: "Combining greek dialytika tonos",
		// 	commands: ["\\textdialytikatonos{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		// {
		// 	codepoint: 0x0345,
		// 	description: "Combining greek ypogegrammeni",
		// 	commands: ["\\textsubl{$char}"],
		// } satisfies Partial<UnicodeLaTeXCommand>,
		{
			codepoint: 838,
			description: "Combining bridge above",
			commands: ["\\overbridge{$char}"],
		},
		// {
		// 	codepoint: 0x03b1,
		// 	commands: ["\\textalpha", "\\upalpha"],
		// 	description: "α",
		// },
	].map(
		({
			codepoint,
			description,
			commands,
		}: Pick<UnicodeLaTeXCommand, "codepoint"> &
			Pick<UnicodeLaTeXCommand, "description"> &
			Pick<UnicodeLaTeXCommand, "commands">) =>
			new UnicodeLaTeXCommand(codepoint, description, commands)
	);

	constructor(
		public readonly codepoint: number,
		public readonly description: string,
		public readonly commands: string[]
	) {
		if (!UnicodeLaTeXCommand.allLatexCommandsAreValid(this)) {
			throw new Error(
				`Invalid LaTeX commands for codepoint ${codepoint}: ${commands}`
			);
		}

		if (!UnicodeLaTeXCommand.hasCombiningOrStandaloneCommands(this)) {
			throw new Error(
				"All commands for a character must be exclusively combining or standalone"
			);
		}

		// throw error if codepoint or any of the commands already exist
		if (UnicodeLaTeXCommand.codepoints.has(codepoint)) {
			throw new Error(`Duplicate codepoint ${codepoint.toString(16)}`);
		}
		if (commands.some((command) => UnicodeLaTeXCommand.commands.has(command))) {
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
			UnicodeLaTeXCommand.commandNames.set(name, this)
		);

		UnicodeLaTeXCommand.codepoints.set(codepoint, this);
		commands.forEach((command) =>
			UnicodeLaTeXCommand.commands.set(command, this)
		);
	}

	isCombiningCharacter(): this is UnicodeLaTeXCombiningCharacter {
		return UnicodeLaTeXCommand.isCombiningCharacter(this);
	}

	static getUnicodeLaTeXCommandFromParsedLaTeXCommand(
		obj: ParsedLaTeXCommandAndValue
	) {
		const result = UnicodeLaTeXCommand.commandNames.get(obj.commandName);
		if (result) {
			return result;
		} else {
			// throw new Error(`No LaTeX command found for ${obj.commandName}`);
			// if (obj.commandName === "symbol") {
			// 	return texSymbolCommandToChar(obj.bracketContents || "");
			// }
		}
	}

	static hasCombiningOrStandaloneCommands(character: UnicodeLaTeXCommand) {
		return (
			UnicodeLaTeXCommand.isCombiningCharacter(character) ||
			UnicodeLaTeXCommand.isStandaloneCharacter(character)
		);
	}

	static isStandaloneCharacter(character: UnicodeLaTeXCommand) {
		return character.commands.every(
			(command) => isTexCommand(command) && !command.includes("{$char}")
		);
	}

	isStandaloneCharacter(): this is UnicodeLaTeXStandaloneCharacter {
		return UnicodeLaTeXCommand.isStandaloneCharacter(this);
	}

	static isCombiningCharacter(character: UnicodeLaTeXCommand) {
		return character.commands.every(
			(command) => isTexCommand(command) && command.includes("{$char}")
		);
	}

	static allLatexCommandsAreValid(obj: UnicodeLaTeXCommand): boolean {
		return obj.commands.every((command) => isTexCommand(command));
		// return obj.commands.every((command) => /^\\
	}
	static instanceOfCombiningCharacter(
		obj: UnicodeLaTeXCommand
	): obj is UnicodeLaTeXCombiningCharacter {
		return UnicodeLaTeXCommand.isCombiningCharacter(obj);
	}

	static instanceOfStandaloneCharacter(
		obj: UnicodeLaTeXCommand
	): obj is UnicodeLaTeXStandaloneCharacter {
		return UnicodeLaTeXCommand.isStandaloneCharacter(obj);
	}
	static getCommandNames(obj: UnicodeLaTeXCommand) {
		return obj.commands.map(
			(command) => parseLatexCommands(command)[0].commandName
		);
	}
	static getBaseCommandNameAndValue(obj: UnicodeLaTeXCommand) {
		return obj.commands.map((command) => parseLatexCommands(command)[0]);
	}

	static isParsedLaTeXCommandCombiningCharacter(
		obj: ParsedLaTeXCommandAndValue
	): obj is ParsedLaTeXCommandAndValue {
		return UnicodeLaTeXCommand.instanceOfCombiningCharacter(
			UnicodeLaTeXCommand.getUnicodeCharacterFromParsedLaTexCommand(obj)
		);
	}

	static isParsedLaTeXCommandStandaloneCharacter(
		obj: ParsedLaTeXCommandAndValue
	): obj is ParsedLaTeXCommandAndValue {
		return UnicodeLaTeXCommand.instanceOfStandaloneCharacter(
			UnicodeLaTeXCommand.getUnicodeCharacterFromParsedLaTexCommand(obj)
		);
	}

	static getUnicodeCharacterFromParsedLaTexCommand(
		obj: ParsedLaTeXCommandAndValue
	): UnicodeLaTeXCombiningCharacter {
		const command = UnicodeLaTeXCommand.commandNames.get(obj.commandName);
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
		command: UnicodeLaTeXCommand,
		combinedWith: string = ""
	): string {
		return (combinedWith + String.fromCodePoint(command.codepoint)).normalize();
	}
}

export class UnicodeLaTeXCombiningCharacter extends UnicodeLaTeXCommand {}

export class UnicodeLaTeXStandaloneCharacter extends UnicodeLaTeXCommand {}
