// export const TexCommandRegex: RegExp = /^\\.+(\{(\$\{.*?\}|\w+?)\})?$/;
export const BaseTexCommandRegex: RegExp = /\\.+(\{(\$\{.*?\}|\w+?)\})?/;
export const StandaloneTexCommand: RegExp = new RegExp(
	`^${BaseTexCommandRegex.source}$`
);

export function isTexCommand(command: string): boolean {
	// return tex.startsWith("\\") && tex.replace(/^\\/g, "").length > 0;
	// return /^\\[a-zA-Z]+(\{.*?\})?$/.test(command);
	// return /^\\[a-zA-Z]+(\{(\$\{.*?\}|\w+?)\})?$/.test(command);
	// return /^\\.+(\{(\$char|\w+?)\})?$/.test(command);
	return StandaloneTexCommand.test(command);
}

export function extractTexCommand(command: string) {
	const matches = command.match(StandaloneTexCommand);
	if (matches) {
		return matches[0];
	}
}

export type ParsedLaTeXCommandAndValue = {
	commandName: string;
	startIndex: number;
	endIndex: number;
	bracketContents?: string;
};

export function parseLatexCommands(
	input: string
): ParsedLaTeXCommandAndValue[] {
	// const regex = /(?:\{?\\)([^\{\}\s)]+)((?:(\{))(.*?)(?:(\})))*(?:\}?)/g;
	// const regex = /(?:\{?\\)([^\{\}\s)]+)(?:\{((?:[^{}]|{\S*?})*?)\})?/g;
	const regex = /(?:\{?\\)([^\{\}\s)]+)((?:(\{))(.*?)(?:(\})))*(?:\}?)/g;
	const results: ParsedLaTeXCommandAndValue[] = [];

	let match;
	while ((match = regex.exec(input)) !== null) {
		const commandName = match[1];
		const bracketContents = match[4] ? match[4] : undefined;
		const startIndex = match.index;
		const endIndex = match.index + match[0].length;
		results.push({ commandName, bracketContents, startIndex, endIndex });
	}

	return results;
}
