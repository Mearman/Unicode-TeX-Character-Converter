import {
	MonthFormat,
	convertMonth,
	convertMonthToNumeric,
	isMonthString,
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
	// should throw for invalid month
	test("should throw for invalid month", () => {
		expect(() => convertMonth("foo")).toThrow();
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
	// should throw for invalid month
	test("should throw for invalid month", () => {
		expect(() => convertMonthToNumeric("foo")).toThrow();
	});
});

describe("isMonthString", () => {
	describe("should return true for valid month strings", () => {
		// TODO: compute the capitalisation variants
		const fixtures = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
			//
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"Jun",
			"Jul",
			"Sept",
			"Nov",
			"Dec",
		];

		const capitalisationVariants = fixtures.flatMap((month) => [
			toSentenceCase(month),
			month.toLowerCase(),
			month.toUpperCase(),
		]);

		// Use capitalisationVariants in the test
		test.each(capitalisationVariants)("%s", (input) => {
			expect(isMonthString(input)).toBe(true);
		});
	});

	describe("should return false for invalid month strings", () => {
		const fixtures = ["foo", "bar", "baz", "po", "ta", "to"];
		test.each(fixtures)("%s", (input) => {
			expect(isMonthString(input)).toBe(false);
		});
	});

	describe("should return false for sentences containing valid month strings", () => {
		const fixtures = [
			"January is a month",
			"February is a month",
			"March is a month",
			"April is a month",
			"May is a month",
			"June is a month",
			"July is a month",
			"August is a month",
			"September is a month",
			"October is a month",
			"November is a month",
			"December is a month",
			//
			"Jan is a month",
			"Feb is a month",
			"Mar is a month",
			"Apr is a month",
			"Jun is a month",
			"Jul is a month",
			"Sept is a month",
			"Nov is a month",
			"Dec is a month",
		];
		test.each(fixtures)("%s", (input) => {
			expect(isMonthString(input)).toBe(false);
		});
	});

	describe("should return false for sentences containing multiple valid month strings", () => {
		const fixtures = [
			"January and February are months",
			"February and March are months",
			"March and April are months",
			"April and May are months",
			"May and June are months",
			"June and July are months",
			"July and August are months",
			"August and September are months",
			"September and October are months",
			"October and November are months",
			"November and December are months",
			//
			"Jan and Feb are months",
			"Feb and Mar are months",
			"Mar and Apr are months",
			"Apr and Jun are months",
			"Jun and Jul are months",
			"Jul and Sept are months",
			"Sept and Nov are months",
			"Nov and Dec are months",
		];
		test.each(fixtures)("%s", (input) => {
			expect(isMonthString(input)).toBe(false);
		});
	});
});
function toSentenceCase(month: string): string {
	return month.charAt(0).toUpperCase() + month.slice(1).toLowerCase();
}

