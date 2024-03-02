export const Discard = "ignore";
export type Discard = typeof Discard;
export const Return = "return";
export type Return = typeof Return;
export const Throw = "throw";
export type Throw = typeof Throw;
export type Handler<V, R> = (value: V) => R;

export type Action<V = string, R = string> = Throw | Discard | Return | Handler<V, R>;

export function handleAction<A extends Action<V, R>, R = string, V = string>(
	action: A,
	value: V
) {
	switch (action) {
		case Discard:
			return "";
		case Return:
			return value;
		case Throw:
			throw new Error(value ? `Invalid value: ${value}` : "Invalid value");
		default:
			return action(value);
	}
}
