export function texSymbolToChar(input: string): string {
	const matches = input.match(/\\symbol\{((['"])(\d+))\}/);
	if (!matches) {
		throw new Error("Invalid input");
	}
	const radix = matches ? parseInt(matches[2]) : 10;
	const charCode = parseInt(matches[3], radix);
	return String.fromCharCode(charCode);
}
