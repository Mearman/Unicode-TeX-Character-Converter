import codePointTexMap from "./characters/codePointTexMap";
import { codepointToUnicode } from "./convert/codepointToUnicode";
import { Hexadecimal, Radix } from "./types/radix";
import { Action, Throw, handleAction } from "./util/handleAction";
import { getLatexRadixSymbol } from "./util/radix/getLatexRadixSymbol";
import {
	ParsedLaTeXCommandAndValue,
	isTexCommand,
	parseLatexCommands,
} from "./util/tex/isTexCommand";

export function decodeCharacter(
	encodedChar: string,
	radix: Radix = Hexadecimal
): string {
	const match = encodedChar.match(/\\symbol\{.([0-9A-F]+)\}/i);
	if (match && match[1]) {
		const charCode = parseInt(match[1], radix);
		return String.fromCharCode(charCode);
	} else {
		return encodedChar;
	}
}

export function texToCodepoint(
	tex: `${string}`,
	onInvalid: Action = Throw,
	onNotFound: Action = Throw
): string {
	if (!isTexCommand(tex)) {
		return handleAction(onInvalid, tex);
	}

	for (const [unicode, texes] of Object.entries(codePointTexMap)) {
		if (Array.isArray(texes)) {
			if (texes.includes(tex)) {
				return unicode;
			}
		} else if (texes === tex) {
			return unicode;
		}
	}
	return handleAction(onNotFound, tex);
}

export function texToUnicode(
	tex: `${string}`,
	onInvalid: Action = Throw,
	onNotFound: Action = Throw
) {
	if (!isTexCommand(tex)) {
		return tex;
	}
	const codePoint = texToCodepoint(tex, onInvalid, onNotFound);
	return codepointToUnicode(codePoint, onInvalid);
}
//
// export function decodeString(
// 	input: string,
// 	radix: Radix = Hexadecimal
// ): string {
// 	let result = "";
// 	let i = 0;
// 	while (i < input.length) {
// 		if (input[i] === "\\") {
// 			// Handle LaTeX command
// 			let commandEnd = input.indexOf("}", i);
// 			if (commandEnd === -1) {
// 				commandEnd = input.length;
// 			}
// 			const latexCommand = input.substring(i, commandEnd + 1);
// 			const unicodeChar = texToUnicode(latexCommand, Discard, Discard);
// 			if (unicodeChar) {
// 				result += unicodeChar;
// 			} else {
// 				result += decodeCharacter(latexCommand, radix);
// 			}
// 			i = commandEnd + 1;
// 		} else {
// 			// Handle normal ASCII character
// 			result += input[i];
// 			i++;
// 		}
// 	}
// 	return result;
// }

export function isAsciiCharacter(char: string): boolean {
	if (char.length !== 1) {
		throw new Error(`Expected single character, got ${char.length} characters`);
	}
	const code = char.charCodeAt(0);
	return code < 128;
}

// export function encodeString(
// 	input: string,
// 	radix: Radix = Hexadecimal
// ): string {
// 	let result = "";
// 	for (const char of input) {
// 		if (!isAsciiCharacter(char)) {
// 			// return encodeStringNonAscii(input, radix);
// 			const latexCommand = unicodeToTex(char, 0, Discard, Discard);
// 			if (latexCommand && !Array.isArray(latexCommand)) {
// 				result += latexCommand;
// 			} else if (latexCommand && Array.isArray(latexCommand)) {
// 				result += latexCommand[0];
// 			} else {
// 				const normalized = char.normalize("NFD");
// 				// let result = "";
// 				for (const n of normalized) {
// 					result += encodeCharacter(n, radix, Return, Return);
// 				}
// 			}
// 		} else {
// 			result += char;
// 		}
// 	}
// 	return result;
// }

export function encodeCharacter(
	char: string,
	radix: Radix = Hexadecimal,
	onInvalid: Action = Throw,
	onNonUnicode: Action = Throw
): string {
	if (char.length !== 1) {
		return handleAction(onInvalid, char);
	}
	if (isAsciiCharacter(char)) {
		return handleAction(onNonUnicode, char);
	} else {
		const charCode = char.charCodeAt(0);
		const baseChar = getLatexRadixSymbol(radix);
		return `\\symbol{${baseChar}${charCode.toString(radix).toUpperCase()}}`;
	}
}

// export function decodeString(
// 	input: string,
// 	radix: Radix = Hexadecimal
// ): string {
// 	let result = "";
// 	let i = 0;
// 	while (i < input.length) {
// 		if (input[i] === "\\") {
// 			// Handle LaTeX command
// 			let commandEnd = input.indexOf("}", i);
// 			if (commandEnd === -1) {
// 				commandEnd = input.length;
// 			}
// 			const latexCommand = input.substring(i, commandEnd + 1);

// 			// Check if next character is '{', indicating a combining sequence
// 			if (input[commandEnd + 1] === "{") {
// 				let combiningEnd = input.indexOf("}", commandEnd + 1);
// 				if (combiningEnd === -1) {
// 					combiningEnd = input.length;
// 				} else {
// 					// Process combining sequence
// 					const combinedChar = processCombiningSequence(
// 						latexCommand,
// 						input.substring(commandEnd + 2, combiningEnd),
// 						radix
// 					);
// 					result += combinedChar;
// 					i = combiningEnd + 1;
// 					continue;
// 				}
// 			}

// 			const unicodeChar = texToUnicode(latexCommand, Discard, Discard);
// 			if (unicodeChar) {
// 				result += unicodeChar;
// 			} else {
// 				result += decodeCharacter(latexCommand, radix);
// 			}
// 			i = commandEnd + 1;
// 		} else {
// 			// Handle normal ASCII character
// 			result += input[i];
// 			i++;
// 		}
// 	}
// 	return result;
// }

// Mapping of LaTeX commands to Unicode combining characters
const latexCombiningMap: Record<string, string> = {
	'"': "\u0308", // Combining diaeresis (¨)
	"`": "\u0300", // Combining grave accent (`)
	"'": "\u0301", // Combining acute accent (´)
	"^": "\u0302", // Combining circumflex accent (^)
	"~": "\u0303", // Combining tilde (~)
	"=": "\u0304", // Combining macron (=)
	".": "\u0307", // Combining dot above (.)
	u: "\u0306", // Combining breve (u)
	v: "\u030C", // Combining caron (v)
	H: "\u030B", // Combining double acute accent (H)
	r: "\u030A", // Combining ring above (r)
	b: "\u0331", // Combining macron below (b)
	d: "\u0323", // Combining dot below (d)
	t: "\u0361", // Combining double inverted breve (t)
	c: "\u0327", // Combining cedilla (c)
	k: "\u0328", // Combining ogonek (k)
	i: "\u0308", // Combining diaeresis (¨)
	j: "\u030C", // Combining caron (v)
	o: "\u0302", // Combining circumflex accent (^)
};

function processCombiningSequence(
	latexCommand: string,
	combinedText: string,
	radix: number
) {
	const combiningChar = latexCombiningMap[latexCommand];
	if (!combiningChar) {
		// If no combining character is found for the command, return the text as is.
		return combinedText;
	}

	// Apply the combining character to each character in combinedText
	return [...combinedText].map((char) => char + combiningChar).join("");
}

const latexCommandMap: Record<string, string | ((char: string) => string)> = {
	"\\alpha": "α", // Example of standalone symbol
	"\\^": (char: string) => char + "\u0302", // Example of combining character (circumflex accent)
};

// export function decodeString(input: string, radix = Hexadecimal) {
// 	let result = "";
// 	let i = 0;
// 	while (i < input.length) {
// 		if (input[i] === "\\") {
// 			let commandEnd = findLatexCommandEnd(input, i);
// 			const latexCommand = input.substring(i, commandEnd);

// 			if (latexCommand in latexCommandMap) {
// 				const commandResult = latexCommandMap[latexCommand];

// 				if (typeof commandResult === "function") {
// 					// Combining character
// 					const nextCharIndex = findNextNonSpaceChar(input, commandEnd);
// 					const nextChar = input[nextCharIndex] || "";
// 					result += commandResult(nextChar);
// 					i = nextCharIndex + 1;
// 				} else {
// 					// Standalone symbol
// 					result += commandResult;
// 					i = commandEnd;
// 				}
// 			} else {
// 				// Fallback for unhandled LaTeX commands
// 				result += latexCommand;
// 				i = commandEnd;
// 			}
// 		} else {
// 			result += input[i];
// 			i++;
// 		}
// 	}
// 	return result;
// }

function findLatexCommandEnd(input: string, startIndex: number) {
	// Implement logic to find the end of a LaTeX command
	// For simplicity, assuming commands end with space or are followed by a non-letter character
	for (let i = startIndex + 1; i < input.length; i++) {
		if (input[i] === " " || !/[a-zA-Z]/.test(input[i])) {
			return i;
		}
	}
	return input.length;
}

function findNextNonSpaceChar(input: string, startIndex: any) {
	// Find the next non-space character after startIndex
	for (let i = startIndex; i < input.length; i++) {
		if (input[i] !== " ") {
			return i;
		}
	}
	return input.length;
}

// function encodeString(input: string) {
// 	let result = "";
// 	let skipNext = false;

// 	for (let i = 0; i < input.length; i++) {
// 		if (skipNext) {
// 			skipNext = false;
// 			continue;
// 		}

// 		const char = input[i];
// 		const nextChar = input[i + 1] || "";

// 		// Check for standalone symbols
// 		if (char in unicodeToLatexMap) {
// 			result += unicodeToLatexMap[char];
// 		}
// 		// Check for combining characters
// 		else if (
// 			nextChar in combiningCharactersMap &&
// 			isCombiningCharacter(nextChar)
// 		) {
// 			result += `${combiningCharactersMap[nextChar]}{${char}}`;
// 			skipNext = true; // Skip next character as it's part of the combining sequence
// 		} else {
// 			result += char; // Directly append characters that don't have a LaTeX equivalent
// 		}
// 	}
// 	return result;
// }

// function isCombiningCharacter(char) {
// 	// Function to determine if a character is a combining character
// 	// For simplicity, checking if the character is in the combiningCharactersMap
// 	return char in combiningCharactersMap;
// }

// type LaTeXCharacterCommand = {
// 	unicode: string;
// 	latex?: string;
// 	type: "standalone" | "combining";
// 	apply?: (char: string) => string;
// };

// const biDirectionalMap: Record<string, LaTeXCharacterCommand> = {
// 	"\\alpha": {
// 		unicode: "α",
// 		type: "standalone",
// 	},
// 	α: {
// 		latex: "\\alpha",
// 		type: "standalone",
// 	},
// 	"\\^": {
// 		unicode: "\u0302", // Circumflex accent
// 		type: "combining",
// 		apply: (char: string) => `${char}\u0302`,
// 	},
// 	"\u0302": {
// 		// Circumflex accent
// 		latex: "\\^",
// 		type: "combining",
// 		apply: (char: string) => `\\^{${char}}`,
// 	},
// 	// ... add more mappings
// };

// function decodeString(input) {
// 	let result = "";
// 	let i = 0;
// 	while (i < input.length) {
// 		if (input[i] === "\\") {
// 			let commandEnd = findLatexCommandEnd(input, i);
// 			const latexCommand = input.substring(i, commandEnd);

// 			const mapEntry = biDirectionalMap[latexCommand];
// 			if (mapEntry && mapEntry.type === "combining") {
// 				const nextChar = input[commandEnd] || "";
// 				result += mapEntry.apply(nextChar);
// 				i = commandEnd + 1;
// 			} else if (mapEntry) {
// 				result += mapEntry.unicode;
// 				i = commandEnd;
// 			} else {
// 				result += latexCommand;
// 				i = commandEnd;
// 			}
// 		} else {
// 			result += input[i];
// 			i++;
// 		}
// 	}
// 	return result;
// }

// function encodeString(input) {
// 	let result = "";
// 	let skipNext = false;

// 	for (let i = 0; i < input.length; i++) {
// 		if (skipNext) {
// 			skipNext = false;
// 			continue;
// 		}

// 		const char = input[i];
// 		const nextChar = input[i + 1] || "";
// 		const mapEntry = biDirectionalMap[char];

// 		if (
// 			mapEntry &&
// 			mapEntry.type === "combining" &&
// 			nextChar === mapEntry.unicode
// 		) {
// 			result += mapEntry.apply(char);
// 			skipNext = true;
// 		} else if (mapEntry) {
// 			result += mapEntry.latex;
// 		} else {
// 			result += char;
// 		}
// 	}
// 	return result;
// }

// const codepointToLatexMap: LaTeXCharacterCommand = {
// 	"03B1": "\\alpha", // α as a standalone symbol
// 	"03B2": "\\beta", // β as a standalone symbol
// 	"0302": { commands: ["\\^"], type: "combining" }, // ̂ (Circumflex accent)
// 	"0300": (char: string) => `\\grave{${char}}`, // ̀ (Grave accent) as a function
// 	// ... add more mappings
// };

// function getLatexRepresentation(char: string) {
// 	const codepoint: string = char.codePointAt(0)?.toString(16).toUpperCase()!;
// 	const entry = codepointToLatexMap[codepoint];

// 	if (typeof entry === "function") {
// 		return entry(char);
// 	}
// 	return entry;
// }

// function isCombiningCharacter(entry) {
// 	return entry && typeof entry === "object" && entry.type === "combining";
// }

// type Ball = string;
// class Car {
// 	drive() {
// 		// hit the gas
// 	}
// }
// class Golfer {
// 	drive(a: Ball) {
// 		// hit the ball far
// 	}
// }

// // No error?
// let w: Car = new Golfer();

// export type TeXCommandString = string | string[];
// export type TeXCommandFunction = (char: string) => TeXCommand;
// export type TeXCommand = TeXCommandString | TeXCommandFunction;

// // export type LaTeXCharacterCommand = {
// // 	commands: TeXCommand;
// // 	type: "standalone" | "combining" | "function";
// // };
// export type LaTeXCharacterCommand =
// 	| {
// 			commands: TeXCommandString;
// 			type: "standalone" | "combining";
// 	  }
// 	| {
// 			commands: TeXCommandFunction;
// 			type: "function";
// 	  };

// const codepointToLatexMap: Record<number, LaTeXCharacterCommand> = {
// 	0x03b1: {
// 		commands: ["\\alpha", "\\othercommandforalpha"],
// 		type: "standalone",
// 	}, // α
// 	0x03b2: {
// 		commands: ["\\beta", "\\anothercommandforbeta"],
// 		type: "standalone",
// 	}, // β
// 	0x0302: { commands: ["\\^", "\\hat"], type: "combining" }, // ̂ (Circumflex accent)
// 	0x0300: {
// 		commands: (char: string) => [`\\grave{${char}}`, `\\anothergrave{${char}}`], // ̀ (Grave accent)
// 		type: "function",
// 	},
// 	// ... add more mappings
// };

// function getLatexCommands(codepoint: number): TeXCommand {
// 	const entry = codepointToLatexMap[codepoint];
// 	if (entry) {
// 		if (typeof entry.commands === "function") {
// 			return entry.commands;
// 		}
// 		// return entry.commands;
// 		return entry.commands;
// 	}
// 	throw new Error(`No LaTeX commands found for codepoint ${codepoint}`);
// }

// // function isCombiningCharacter(
// // 	entry: LaTeXCharacterCommand
// // ): entry is { commands: TeXCommandString; type: "combining" } {
// // 	return entry && entry.type === "combining";
// // }

// function isFunctionCharacter(
// 	entry: LaTeXCharacterCommand
// ): entry is { commands: TeXCommandFunction; type: "function" } {
// 	return (
// 		entry &&
// 		(entry.type === "function" ||
// 			typeof entry.commands === "function" ||
// 			(Array.isArray(entry.commands) &&
// 				entry.commands.every((command) => typeof command === "function")))
// 	);
// }

// function isTexCommandString(
// 	entry: LaTeXCharacterCommand
// ): entry is { commands: TeXCommandString; type: "standalone" | "combining" } {
// 	return (
// 		entry &&
// 		(entry.type === "standalone" || entry.type === "combining") &&
// 		((Array.isArray(entry.commands) &&
// 			entry.commands.every((command) => typeof command === "string")) ||
// 			typeof entry.commands === "string")
// 	);
// }

// export function encodeString(input: string) {
// 	let result = "";
// 	let skipNext = false;

// 	for (let i = 0; i < input.length; i++) {
// 		if (skipNext) {
// 			skipNext = false;
// 			continue;
// 		}

// 		const char = input[i];
// 		const nextChar: string = input[i + 1] || "";
// 		const codepoint: number = char.codePointAt(0)!;
// 		const entry: LaTeXCharacterCommand = codepointToLatexMap[codepoint];

// 		if (entry) {
// 			if (isFunctionCharacter(entry)) {
// 				result += entry.commands(char);
// 			} else if (isTexCommandString(entry)) {
// 				if (Array.isArray(entry.commands)) {
// 					result += entry.commands[0];
// 				} else {
// 					result += entry.commands;
// 				}
// 			} else {
// 				result += char;
// 			}
// 		} else {
// 			result += char; // Directly append characters that don't have a LaTeX equivalent
// 		}
// 	}
// 	return result;
// }

// // let latexToUnicodeMap = {};

// // for (const [codepoint, info] of Object.entries(codepointToLatexMap)) {
// //   const unicodeChar = String.fromCodePoint(parseInt(codepoint, 16));

// //   if (typeof info.commands === "function") {
// //     // Handle function-based commands
// //     latexToUnicodeMap = { ...latexToUnicodeMap, ...info.commands(unicodeChar) };
// //   } else {
// //     info.commands.forEach((command) => {
// //       latexToUnicodeMap[command] = unicodeChar;
// //     });
// //   }
// // }

// const latexToUnicodeMap = Object.entries(codepointToLatexMap).reduce((acc, [codepoint, info]) => {
//   const unicodeChar = String.fromCodePoint(parseInt(codepoint, 16));

// 	if (isFunctionCharacter(info)) {
// 		// Handle function-based commands
// 		// return { ...acc, ...info.commands(unicodeChar) };
// 		const commands = info.commands(unicodeChar);
// 	} else if (isTexCommandString(info)) {
// 		info.commands.forEach((command) => {
// 			acc[command] = unicodeChar;
// 		});
// 	}

// })

// function decodeString(input) {
//   let result = "";
//   let i = 0;

//   while (i < input.length) {
//     if (input[i] === "\\") {
//       let commandEnd = findEndOfLatexCommand(input, i);
//       const latexCommand = input.substring(i, commandEnd);

//       if (latexToUnicodeMap.hasOwnProperty(latexCommand)) {
//         result += latexToUnicodeMap[latexCommand];
//         i = commandEnd;
//       } else {
//         // Handle unknown LaTeX commands
//         result += latexCommand;
//         i = commandEnd;
//       }
//     } else {
//       result += input[i];
//       i++;
//     }
//   }

//   return result;
// }

// function findEndOfLatexCommand(input, startIndex) {
//   startIndex += 1; // Skip the backslash
//   while (startIndex < input.length && /[a-zA-Z]/.test(input[startIndex])) {
//     startIndex++;
//   }
//   return startIndex;
// }
// export type UnicodeLaTeXCommand = {
// 	codepoint: number;
// 	description: string;
// 	commands: string[];
// };

export class UnicodeLaTeXCommand {
	static codepoints: Map<number, UnicodeLaTeXCommand> = new Map();
	static commands: Map<string, UnicodeLaTeXCommand> = new Map();
	static commandNames: Map<string, UnicodeLaTeXCommand> = new Map();
	commandNames: string[];
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
			throw new Error(`No LaTeX command found for ${obj.commandName}`);
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

	// static getUnicodeCharacterFromParsedLaTexCommand(obj: ParsedLaTeXCommandAndValue): UnicodeLaTeXCombiningCharacter {

	// }

	static toUnicode(
		command: UnicodeLaTeXCommand,
		combinedWith: string = ""
	): string {
		return (combinedWith + String.fromCodePoint(command.codepoint)).normalize();
	}
}

export class UnicodeLaTeXCombiningCharacter extends UnicodeLaTeXCommand {
	// toUnicode(combinedWith: string = ""): string {
	// 	return this.codepoint + combinedWith;
	// }
}

export class UnicodeLaTeXStandaloneCharacter extends UnicodeLaTeXCommand {}

export const codepointToLatexMap: UnicodeLaTeXCommand[] = [
	{
		codepoint: 0x03b1,
		description: "α as a standalone symbol",
		commands: ["\\alpha"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x03b2,
		description: "β as a standalone symbol",
		commands: ["\\beta"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	// {
	// 	codepoint: 0x0302,
	// 	description: "̂ (Circumflex accent)",
	// 	commands: ["\\^{$char}"],
	// } satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0110,
		description: "Đ as a standalone symbol",
		commands: ["\\DJ", "\\textcrD"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0131,
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
		codepoint: 0x0300,
		description: "Combining grave accent (̀)",
		commands: ["\\`{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0301,
		description: "Combining acute accent (´)",
		commands: ["\\'{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0302,
		description: "Combining circumflex accent (^)",
		commands: ["\\^{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0303,
		description: "Combining tilde (~)",
		commands: ["\\~{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0304,
		description: "Combining macron (=)",
		commands: ["\\={$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0305,
		description: "Combining overline",
		commands: ["\\overline{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0306,
		description: "Combining breve (u)",
		commands: ["\\u{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0307,
		description: "Combining dot above (.)",
		commands: ["\\.{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		commands: ['\\"{$char}'],
		codepoint: 0x0308,
		description: "Combining diaeresis (¨)",
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0309,
		description: "Combining hook above",
		commands: ["\\texthookabove{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x030a,
		description: "Combining ring above (r)",
		commands: ["\\r{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x030b,
		description: "Combining double acute accent (H)",
		commands: ["\\H{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x030c,
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
		codepoint: 0x030f,
		description: "Combining double grave accent",
		commands: ["\\textdoublegrave{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0310,
		description: "Combining candrabindu",
		commands: ["\\textcandra{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0311,
		description: "Combining inverted breve",
		commands: ["\\textinvbreve{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0312,
		description: "Combining turned comma above",
		commands: ["\\textcommabelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0313,
		description: "Combining comma above",
		commands: ["\\textcommaabove{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0314,
		description: "Combining reversed comma above",
		commands: ["\\textreversedcomma{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0315,
		description: "Combining comma above right",
		commands: ["\\textcommaaboveright{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0316,
		description: "Combining grave accent below",
		commands: ["\\grave{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0317,
		description: "Combining acute accent below",
		commands: ["\\acute{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0318,
		description: "Combining left tack below",
		commands: ["\\texttackdown{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	// {
	// 	codepoint: 0x0319,
	// 	description: "Combining right tack below",
	// 	commands: ["\\texttackup{$char}"],
	// } satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x031a,
		description: "Combining left angle above",
		commands: ["\\textleftangle{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x031b,
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
		codepoint: 0x0321,
		description: "Combining palatalized hook below",
		commands: ["\\textpalhookbelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0322,
		description: "Combining retroflex hook below",
		commands: ["\\textretroflexhookbelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0323,
		description: "Combining dot below (d)",
		commands: ["\\d{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0324,
		description: "Combining diaeresis below",
		commands: ["\\textdiaeresisbelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0325,
		description: "Combining ring below",
		commands: ["\\textsubring{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	// {
	// 	codepoint: 0x0326,
	// 	description: "Combining comma below (c)",
	// 	commands: ["\\c{$char}"],
	// } satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0327,
		description: "Combining cedilla (c)",
		commands: ["\\c{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0328,
		description: "Combining ogonek (k)",
		commands: ["\\k{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	// {
	// 	codepoint: 0x0329,
	// 	description: "Combining vertical line below",
	// 	commands: ["\\textvline{$char}"],
	// } satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x032a,
		description: "Combining bridge below",
		commands: ["\\textbridgebelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x032b,
		description: "Combining inverted double arch below",
		commands: ["\\textdoublearchbelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x032c,
		description: "Combining caron below",
		commands: ["\\textcaronbelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x032d,
		description: "Combining circumflex accent below",
		commands: ["\\textcircumflexbelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x032e,
		description: "Combining breve below",
		commands: ["\\textbrevebelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x032f,
		description: "Combining inverted breve below",
		commands: ["\\textinvertedbrevebelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0330,
		description: "Combining tilde below",
		commands: ["\\texttilde{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0331,
		description: "Combining macron below (b)",
		commands: ["\\b{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0332,
		description: "Combining low line",
		commands: ["\\textlowline{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0333,
		description: "Combining double low line",
		commands: ["\\textdoublelowline{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0334,
		description: "Combining tilde overlay",
		commands: ["\\texttildeoverlay{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0335,
		description: "Combining short stroke overlay",
		commands: ["\\textshortstrokeoverlay{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0336,
		description: "Combining long stroke overlay",
		commands: ["\\textlongstrokeoverlay{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0337,
		description: "Combining short solidus overlay",
		commands: ["\\textshortsolidusoverlay{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0338,
		description: "Combining long solidus overlay",
		commands: ["\\textlongsolidusoverlay{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x0339,
		description: "Combining right half ring below",
		commands: ["\\rightharpoonaccent{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x033a,
		description: "Combining inverted bridge below",
		commands: ["\\textinvertedbridgebelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x033b,
		description: "Combining square below",
		commands: ["\\textsquarebelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x033c,
		description: "Combining seagull below",
		commands: ["\\textseagullbelow{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x033d,
		description: "Combining x above",
		commands: ["\\textovercross{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
	// {
	// 	codepoint: 0x033e,
	// 	description: "Combining vertical tilde",
	// 	commands: ["\\textvtilde{$char}"],
	// } satisfies Partial<UnicodeLaTeXCommand>,
	{
		codepoint: 0x033f,
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
		codepoint: 0x0346,
		description: "Combining bridge above",
		commands: ["\\overbridge{$char}"],
	} satisfies Partial<UnicodeLaTeXCommand>,
].map(
	({ codepoint, description, commands }) =>
		new UnicodeLaTeXCommand(codepoint, description, commands)
);

export function encodeString(input: string, radix: Radix = Hexadecimal) {
	input = input.normalize("NFD");
	const radixSymbol = getLatexRadixSymbol(radix);
	let result = "";
	let skipNext = false;

	// for (let i = 0; i < input.length; i++) {
	// for (const [i, char] of input.split("")) {
	const split = input.split("");
	// split.forEach((char, i) => {
	for (let i = 0; i < split.length; i++) {
		const char = split[i];
		if (skipNext) {
			skipNext = false;
			continue;
			// break
			// return;
		}

		const isAsciiCharacter = char.codePointAt(0)! < 128;
		// const char = input[i];
		if (isAsciiCharacter) {
			result += char;
		} else {
			const charCode = char.codePointAt(0)!;
			const unicodeLatexCommand = UnicodeLaTeXCommand.codepoints.get(charCode);

			if (unicodeLatexCommand) {
				if (UnicodeLaTeXCommand.isCombiningCharacter(unicodeLatexCommand)) {
					// const nextChar = input[i + 1] || "";
					const parentChar = split[i - 1] || "";
					// const nextCharCode = nextChar.codePointAt(0)!.toString(radix);
					const command = unicodeLatexCommand.commands[0].replace(
						"$char",
						parentChar
					);
					// result += command;
					// replace last character in result
					result = result.slice(0, -1) + command;
					// skipNext = true;
				} else {
					result += unicodeLatexCommand.commands[0];
				}
			} else {
				// Use \symbol{codepoint} for characters without a specific LaTeX command
				result += `\\symbol{${radixSymbol}${charCode.toString(radix)}}`;
			}
		}
	}
	return result;
}

// export function decodeString(input: string) {
// 	let result = "";
// 	let i = 0;

// 	while (i < input.length) {
// 		if (input[i] === "\\") {
// 			let commandEnd = input.indexOf(" ", i); // Assuming command ends with space
// 			if (commandEnd === -1) commandEnd = input.length;
// 			const latexCommand = input.substring(i, commandEnd);

// 			const unicodeLatexCommand =
// 				UnicodeLaTeXCommand.commands.get(latexCommand);
// 			if (unicodeLatexCommand) {
// 				if (UnicodeLaTeXCommand.isCombiningCharacter(unicodeLatexCommand)) {
// 					// Handle combining characters
// 					i = commandEnd; // Update index to end of command
// 					const nextChar = input[i] || "";
// 					result +=
// 						String.fromCodePoint(unicodeLatexCommand.codepoint) + nextChar;
// 					i++; // Skip next character as it's part of the combining sequence
// 				} else {
// 					result += String.fromCodePoint(unicodeLatexCommand.codepoint);
// 					i = commandEnd;
// 				}
// 			} else {
// 				result += latexCommand;
// 				i = commandEnd;
// 			}
// 		} else {
// 			result += input[i];
// 			i++;
// 		}
// 	}
// 	return result;
// }
// export function decodeString(input: string) {
// 	let result = "";
// 	let i = 0;

// 	while (i < input.length) {
// 		if (input[i] === "\\") {
// 			if (input.startsWith("\\symbol{", i)) {
// 				// Handle \symbol{codepoint} command
// 				let j = i + "\\symbol{".length;
// 				// get the radix symbol if present
// 				let radixSymbol: LaTeXSymbolRadix = "";
// 				let radix: Radix = 10;
// 				if (input[j] === "'" || input[j] === '"') {
// 					radixSymbol = input[j] as LaTeXSymbolRadix;
// 					radix = radixSymbolToRadix(radixSymbol);
// 					j++;
// 				}

// 				let codepointStr = "";
// 				while (j < input.length && input[j] !== "}") {
// 					codepointStr += input[j];
// 					j++;
// 				}
// 				const codepoint = parseInt(codepointStr, radix);
// 				result += String.fromCodePoint(codepoint);
// 				i = j + 1; // Move index past the closing brace
// 			} else {
// 				// Handling other LaTeX commands
// 				let j = i + 1;
// 				while (j < input.length && /[a-zA-Z]/.test(input[j])) {
// 					j++;
// 				}
// 				const latexCommand = input.substring(i, j);
// 				const commandKey = latexCommand.replace(/(\{.*?\})/g, "{$char}");
// 				const unicodeLatexCommand =
// 					UnicodeLaTeXCommand.commands.get(commandKey);

// 				if (unicodeLatexCommand) {
// 					if (UnicodeLaTeXCommand.isCombiningCharacter(unicodeLatexCommand)) {
// 						// Handle combining characters
// 						const combinedChar = input[j] || "";
// 						result +=
// 							String.fromCodePoint(unicodeLatexCommand.codepoint) +
// 							combinedChar;
// 						i = j + 1; // Skip the combined character
// 					} else {
// 						result += String.fromCodePoint(unicodeLatexCommand.codepoint);
// 						i = j;
// 					}
// 				} else {
// 					result += latexCommand;
// 					i = j;
// 				}
// 			}
// 		} else {
// 			result += input[i];
// 			i++;
// 		}
// 	}
// 	return result;
// }

export function decodeString(
	encodedString: string,
	radix: Radix = Hexadecimal
): string {
	let decodedString = encodedString;
	let i = 0;

	// const commands = extractTexCommand(encodedString);

	// while (i < encodedString.length) {
	// 	const char = encodedString[i];

	// 	// Check for LaTeX command or symbol
	// 	if (char === "\\") {
	// 		const nextSpaceIndex = encodedString.indexOf(" ", i);
	// 		const command = encodedString.slice(i, nextSpaceIndex);
	// 		const decodedChar = decodeLatexCommand(command);

	// 		if (decodedChar) {
	// 			result += decodedChar;
	// 			i = nextSpaceIndex + 1;
	// 		} else {
	// 			// Handle \symbol{code}
	// 			const codeStart = command.indexOf("{") + 1;
	// 			const codeEnd = command.indexOf("}", codeStart);
	// 			const codePoint = parseInt(command.slice(codeStart, codeEnd), radix);
	// 			result += String.fromCodePoint(codePoint);
	// 			i = codeEnd + 1;
	// 		}
	// 	} else {
	// 		// ASCII character, add directly
	// 		result += char;
	// 		i++;
	// 	}
	// }

	// return result.normalize("NFD");

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
// 	const command = latexCommand.replace(/(\{.*?\})/g, "{$char}");
// 	const unicodeLatexCommand = UnicodeLaTeXCommand.commands.get(command);

// 	if (unicodeLatexCommand) {
// 		if (UnicodeLaTeXCommand.isCombiningCharacter(unicodeLatexCommand)) {
// 			const codepoint = unicodeLatexCommand.codepoint;
// 		} else {
// 			return String.fromCodePoint(unicodeLatexCommand.codepoint);
// 		}
// 	}
// 	return null;
// }
