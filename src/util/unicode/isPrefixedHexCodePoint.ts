import { PrefixedHexCodePoint } from "types/Hex";

export const isPrefixedHexCodePoint = (codePoint: string): codePoint is PrefixedHexCodePoint => codePoint.match(/^U\+[0-9A-F]{4,6}$/i) !== null;
