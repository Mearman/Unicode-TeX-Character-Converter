export const EscapeCharacters = {
	"%": "\\%",
	$: "\\$",
	"{": "\\{",
	_: "\\_",
	"¶": "\\P",
	"‡": "\\ddag",
	"|": "\\textbar",
	">": "\\textgreater",
	"–": "\\textendash",
	"™": "\\texttrademark",
	"¡": "\\textexclamdown",
	"£": "\\pounds",
	"#": "\\#",
	"&": "\\&",
	"}": "\\}",
	"§": "\\S",
	"†": "\\dag",
	"\\": "\\textbackslash",
	"<": "\\textless",
	"—": "\\textemdash",
	"®": "\\textregistered",
	"¿": "\\textquestiondown",
	"ⓐ": "\\textcircled{a}",
} as const;

export type EscapedCharacter = typeof EscapeCharacters extends Record<
	infer _K,
	infer V
>
	? V
	: never;

export type UnescapedCharacter = typeof EscapeCharacters extends Record<
	infer K,
	unknown
>
	? K
	: never;

export const EscapeCharacterMap = new Map<UnescapedCharacter, EscapedCharacter>(
	Object.entries(EscapeCharacters) as [UnescapedCharacter, EscapedCharacter][]
);

export const UnescapedCharacterValues: UnescapedCharacter[] = [
	...EscapeCharacterMap.keys(),
];

export const EscapedCharacterValues: EscapedCharacter[] = [
	...EscapeCharacterMap.values(),
];

/**
 * Converts an unescaped character to its escaped counterpart.
 * @param unescaped The unescaped character to be converted.
 * @returns The escaped character.
 */
export function toEscaped(unescaped: UnescapedCharacter): EscapedCharacter {
	return EscapeCharacterMap.get(unescaped) as EscapedCharacter;
}

/**
 * An alias for `toEscaped`.
 */
export const fromUnescaped = toEscaped;

/**
 * Converts an escaped character to its unescaped counterpart.
 * @param escaped The escaped character to convert.
 * @returns The corresponding unescaped character.
 */
export function fromEscaped(escaped: EscapedCharacter): UnescapedCharacter {
	return [...EscapeCharacterMap].find(([, value]) => value === escaped)![0];
}

/**
 * An alias for `fromEscaped`.
 */
export const toUnescaped = fromEscaped;

export function replaceAllEscapedWithUnescaped(input: string): string {
	return UnescapedCharacterValues.map((unescaped) => {
		const escaped = toEscaped(unescaped);
		return [escaped, unescaped];
	}, input).reduce(
		(prev, [escaped, unescaped]) => prev.split(escaped).join(unescaped),
		input
	);
}

export function replaceAllUnescapedWithEscaped(
	input: string,
	wrap: boolean = false
): string {
	let escapedResult = "";
	for (let i = 0; i < input.length; i++) {
		const matched: string = EscapedCharacterValues.reduce((prev, escaped) => {
			if (prev) return prev;
			if (input.slice(i).startsWith(escaped)) {
				return escaped;
			}
			return prev;
		}, "");
		if (!matched) {
			const unescaped = input[i];
			if (unescaped in EscapeCharacters) {
				const escaped = toEscaped(unescaped as UnescapedCharacter)
				if (wrap) {
					escapedResult += `${escaped}`;
				} else {
					escapedResult += escaped;
				}
			} else {
				escapedResult += unescaped;
			}
		} else {
			escapedResult += matched;
			i += matched.length - 1;
		}
	}
	return escapedResult;
}
