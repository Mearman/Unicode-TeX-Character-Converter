////////////////////////////////////////////////////////////////////////////////
export type MonthFormat = Exclude<
	Intl.DateTimeFormatOptions["month"],
	undefined
>;
////////////////////////////////////////////////////////////////////////////////
export type Locale = Intl.LocalesArgument;
////////////////////////////////////////////////////////////////////////////////
export function convertMonth(
	input: string,
	format: MonthFormat = "long",
	locale: Locale = "en-GB"
): string {
	const data = new Date(`${input} 1 2000`);
	if (isNaN(data.getMonth())) {
		throw new Error(`Invalid month string: ${input}`);
	}
	return data.toLocaleString(locale, { month: format });
}
////////////////////////////////////////////////////////////////////////////////
export function convertMonthToNumeric(
	input: string,
	locale: Locale = "en-GB"
): number {
	const result = convertMonth(input, "numeric", locale);
	const intResult = parseInt(result, 10);
	if (isNaN(intResult)) {
		throw new Error(`Invalid numeric month: ${result}`);
	}
	return intResult;
}
