export function isDoubleByte(str: `${string}`) {
	if (str.length !== 1) {
		throw new Error(`Invalid double byte: ${str}`);
	}
	const charCode = str.charCodeAt(0);
	return charCode > 255;
}
