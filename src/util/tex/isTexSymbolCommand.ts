import { parseLatexCommands } from "./isTexCommand";

export function isTexSymbolCommand(input: string): boolean {
	const commands = parseLatexCommands(input);
	return (
		commands.length === 1 &&
		commands[0].commandName === "symbol" &&
		commands[0].bracketContents !== undefined &&
		commands[0].bracketContents.match(/[A-Z0-9]+/i) !== null
	);
}
