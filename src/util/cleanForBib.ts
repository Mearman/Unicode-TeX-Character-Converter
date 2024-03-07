export function cleanForBib(str: string): string {
	return str.replace(/[^\x00-\x7F]/g, (char) => {
		switch (char) {
			case "‘":
			case "’":
				return "'";
			case "“":
			case "”":
				return '"';
			case "–":
				return "-";
			case "—":
				return "--";
			case "…":
				return "...";
			default:
				return char;
		}
	});
}
