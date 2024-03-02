export const Ignore = "ignore";
export type Ignore = typeof Ignore;
export const Return = "return";
export type Return = typeof Return;
export const Throw = "throw";
export type Throw = typeof Throw;
export type Action = Throw | Ignore | Return | ((value: string) => string);

export function handleAction(
	action: Action,
	value: string,
	defaultValue = "",
	errorMessage = `Invalid value: ${value}`
) {
	switch (action) {
		case Throw:
			throw new Error(errorMessage);
		case Ignore:
			return defaultValue;
		case Return:
			return value;
		default:
			if (typeof action === "function") {
				return action(value);
			}
			return defaultValue;
	}
}
