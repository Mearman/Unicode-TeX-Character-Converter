export function isTexCommand(tex: string) {
	return tex.startsWith("\\") && tex.replace(/^\\/g, "").length > 0;
}
