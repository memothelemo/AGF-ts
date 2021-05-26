declare global {
	interface GlobalAeroShared {
		StringUtil: typeof StringUtil;
	}
}

interface StringBuilder {
	Append(str: string): void;
	Prepend(str: string): void;
	ToString(): string;
}

interface StringUtil {
	/**
	 * Trims whitespace from the start and end of the string.
	 * ```
	 * StringUtil.Trim("  hello world  ") == "hello world"
	 * ```
	 */
	Trim: (str: string) => string;

	/**
	 * The same as Trim, but only trims the start of the string.
	 * ```
	 * StringUtil.TrimStart("  hello world  ") == "hello world  "
	 * ```
	 */
	TrimStart: (str: string) => string;

	/**
	 * The same as Trim, but only trims the end of the string.
	 * ```
	 * StringUtil.TrimEnd("  hello world  ") == "  hello world"
	 * ```
	 */
	TrimEnd: (str: string) => string;

	/**
	 * Checks if two strings are equal, but ignores their case.
	 * ```
	 * StringUtil.EqualsIgnoreCase("HELLo woRLD", "hEllo wORLd") == true
	 * ```
	 */
	EqualsIgnoreCase: <S extends string, C extends string>(
		str: S,
		compare: C,
	) => Lowercase<S> extends Lowercase<C> ? true : false;

	/**
	 * Removes all whitespace from a string.
	 * ```
	 * StringUtil.RemoveWhitespace("  hello World!\n") == "helloWorld!"
	 * ```
	 */
	RemoveWhitespace: (str: string) => string;

	/**
	 * Checks if a string ends with a certain string.
	 * ```
	 * StringUtil.EndsWith("Hello world", "rld") == true
	 * ```
	 */
	EndsWith: (str: string, endsWith: string) => boolean;

	/**
	 * Checks if a string starts with a certain string.
	 * ```
	 * StringUtil.StartsWith("Hello world", "He") == true
	 * ```
	 */
	StartsWith: (str: string, startsWith: string) => boolean;

	/**
	 * Checks if a string contains another string.
	 * ```
	 * StringUtil.Contains("Hello world", "lo wor") == true
	 * ```
	 */
	Contains: (str: string, contains: string) => boolean;

	/**
	 * Returns a table of all the characters in the string.
	 * ```
	 * StringUtil.ToCharArray("Hello") >>> {"H","e","l","l","o"}
	 * ```
	 */
	ToCharArray: (str: string) => string[];

	/**
	 * Returns a table of all the bytes of each character in the string.
	 * ```
	 * StringUtil.ToByteArray("Hello") >>> {72,101,108,108,111}
	 * ```
	 */
	ToByteArray: (str: string) => Array<number>;

	/**
	 * Transforms an array of bytes into a string.
	 * ```
	 * StringUtil.ByteArrayToString({97, 98, 99}) == "abc"
	 * ```
	 */
	ByteArrayToString: (bytes: Array<number>) => string;

	/**
	 * Returns a string in camelCase.
	 * ```
	 * StringUtil.ToCamelCase("Hello_world-abc") == "helloWorldAbc"
	 * ```
	 */
	ToCamelCase: (str: string) => string;

	/**
	 * Returns a string in PascalCase.
	 * ```
	 * StringUtil.ToPascalCase("Hello_world-abc") == "HelloWorldAbc"
	 * ```
	 */
	ToPascalCase: (str: string) => string;

	/**
	 * Returns a string in snake_case or SNAKE_CASE.
	 * ```
	 * StringUtil.ToSnakeCase("Hello_world-abc") == "hello_world_abc"
	 * StringUtil.ToSnakeCase("Hello_world-abc", true) == "HELLO_WORLD_ABC"
	 * ```
	 */
	ToSnakeCase: (str: string) => string;

	/**
	 * Returns a string in kebab-case or KEBAB-CASE.
	 * ```
	 * StringUtil.ToKebabCase("Hello_world-abc") == "hello-world-abc"
	 * StringUtil.ToKebabCase("Hello_world-abc", true) == "HELLO-WORLD-ABC"
	 * ```
	 */
	ToKebabCase: (str: string) => string;

	/**
	 * Escapes a string from pattern characters. In other words, it prefixes
	 * any special pattern characters with a %. For example, the dollar
	 * sign $ would become %$. See the example below.
	 * ```
	 * StringUtil.Escape("Hello. World$ ^-^") == "Hello%. World%$ %^%-%^"
	 * ```
	 */
	Escape: (str: string) => string;

	/**
	 * Creates a StringBuilder object that can be used to build a string. This
	 * is useful when a large string needs to be concatenated. Traditional
	 * concatenation of a string using ".." can be a performance issue, and thus
	 * StringBuilders can be used to store the pieces of the string in a table
	 * and then concatenate them all at once.
	 * ```
	 * const builder = StringUtil.StringBuilder()
	 * builder.Append("world")
	 * builder.Prepend("Hello ")
	 * builder.ToString() == "Hello world"
	 * tostring(builder)  == "Hello world"
	 * ```
	 */
	StringBuilder: () => StringBuilder;
}

declare const StringUtil: StringUtil;
export = StringUtil;
