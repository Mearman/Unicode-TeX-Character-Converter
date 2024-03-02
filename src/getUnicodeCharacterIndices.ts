import { isDoubleByte } from "isDoubleByte";

export const getUnicodeCharacterInices = (str: string): number[] => str.split("").filter((char, i) => isDoubleByte(char as `${string}`)).map((_, i) => i);
