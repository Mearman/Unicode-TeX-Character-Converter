
const Octal = 8;
type Octal = typeof Octal;
export { Octal };

const Hexadecimal = 16;
type Hexadecimal = typeof Hexadecimal;
export { Hexadecimal };

const Decimal = 10;
type Decimal = typeof Decimal;
export { Decimal };

export type Radix = Octal | Decimal | Hexadecimal;
