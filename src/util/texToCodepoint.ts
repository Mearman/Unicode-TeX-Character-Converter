import codePointTexMap from "../characters/codePointTexMap";
import { Action, Throw, handleAction } from "./handleAction";
import { isTexCommand } from "./tex/isTexCommand";

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
