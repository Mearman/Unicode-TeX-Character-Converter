export function isTexCommand(command: string): boolean {
	// return tex.startsWith("\\") && tex.replace(/^\\/g, "").length > 0;
	// return /^\\[a-zA-Z]+(\{.*?\})?$/.test(command);
	// return /^\\[a-zA-Z]+(\{(\$\{.*?\}|\w+?)\})?$/.test(command);
	// return /^\\.+(\{(\$char|\w+?)\})?$/.test(command);
	return /^\\.+(\{(\$\{.*?\}|\w+?)\})?$/.test(command);
}
