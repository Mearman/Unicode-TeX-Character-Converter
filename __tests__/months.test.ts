import {
	MonthFormat,
	convertMonth,
	convertMonthToNumeric,
} from "../src/util/convertMonth";

const fixtures: Partial<Record<MonthFormat, string>>[] = [
	{
		long: "January",
		short: "Jan",
		numeric: "1",
		"2-digit": "01",
		narrow: "J",
	},
	{
		long: "February",
		short: "Feb",
		numeric: "2",
		"2-digit": "02",
		narrow: "F",
	},
	{
		long: "March",
		short: "Mar",
		numeric: "3",
		"2-digit": "03",
		narrow: "M",
	},
	{
		long: "April",
		short: "Apr",
		numeric: "4",
		"2-digit": "04",
		narrow: "A",
	},
	{
		long: "May",
		short: "May",
		numeric: "5",
		"2-digit": "05",
		narrow: "M",
	},
	{
		long: "June",
		short: "Jun",
		numeric: "6",
		"2-digit": "06",
		narrow: "J",
	},
	{
		long: "July",
		short: "Jul",
		numeric: "7",
		"2-digit": "07",
		narrow: "J",
	},
	{
		long: "August",
		short: "Aug",
		numeric: "8",
		"2-digit": "08",
		narrow: "A",
	},
	{
		long: "September",
		short: "Sept",
		numeric: "9",
		"2-digit": "09",
		narrow: "S",
	},
	{
		long: "October",
		short: "Oct",
		numeric: "10",
		"2-digit": "10",
		narrow: "O",
	},
	{
		long: "November",
		short: "Nov",
		numeric: "11",
		"2-digit": "11",
		narrow: "N",
	},
	{
		long: "December",
		short: "Dec",
		numeric: "12",
		"2-digit": "12",
		narrow: "D",
	},
];

describe("convertMonth", () => {
	describe.each(fixtures)("convert %s", (month) => {
		const fromFormats = Object.keys(month).filter(
			(e) => e != "narrow"
		) as (keyof typeof month)[];
		describe.each(fromFormats)("from %s", (fromFormat) => {
			const toFormats = Object.keys(month);
			describe.each(toFormats)(" to %s", (format: any) => {
				const value = month[fromFormat]!;
				const expected = (month as any)[format];
				const name = `${fromFormat} > ${format}: "${value}" > ${expected}`;
				test(name, () => {
					const result = convertMonth(value, format);
					expect(result).toBe(expected);
				});
			});
		});
	});
});

describe("convertMonthToNumeric", () => {
	describe.each(fixtures)("convert %s to numeric", (month) => {
		const fromFormats = Object.keys(month).filter(
			(e) => e != "narrow"
		) as (keyof typeof month)[];
		describe.each(fromFormats)("from %s", (format) => {
			const value = month[format as MonthFormat]!;
			const expected = parseInt(month.numeric!, 10);
			const name = `${format} > numeric: "${value}" > ${expected}`;
			test(name, () => {
				const result = convertMonthToNumeric(value);
				expect(result).toBe(expected);
			});
		});
	});
});
