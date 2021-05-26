declare global {
	interface GlobalAeroShared {
		Base64: typeof Base64;
	}
}

interface Base64 {
	Encode(input: string): string;
	Decode(input: string): string;
}

interface Base64Constructor {
	new (): Base64;
}

declare const Base64: Base64Constructor;
export = Base64;
