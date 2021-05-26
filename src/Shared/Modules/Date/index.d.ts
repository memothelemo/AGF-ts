declare global {
	interface GlobalAeroShared {
		Date: typeof Date;
	}
}

interface Date {
	Hour: number;
	Minute: number;
	Weekday: number;
	Day: number;
	Month: number;
	Year: number;
	Second: number;
	Millisecond: number;
	Yearday: number;
	IsDST: boolean;

	ToJSON(): string;
	ToSeconds(): number;
	GetTimezoneHourOffset(): number;
	Format(format: string): string;
	ToUTC(): Date;
	ToLocal(): Date;
	ToISOString(): string;
	ToDateString(): string;
	ToTimeString(): string;
	ToString(): string;
}

interface DateConstructor {
	new (): Date;
	new (seconds: number): Date;
	new (seconds: number, useUTC: boolean): Date;

	/**
	 * Converts a JSON object into a Date object.
	 *
	 * To save in JSON, you should use `Date.ToJSON`
	 * @param jsonString The saved JSON string
	 */
	fromJSON(jsonString: string): Date;
}

declare const Date: DateConstructor;
export = Date;
