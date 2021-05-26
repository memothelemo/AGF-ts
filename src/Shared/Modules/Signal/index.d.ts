import Maid from "../Maid";

declare global {
	interface GlobalAeroShared {
		Signal: typeof Signal;
	}
}

declare namespace Signal {
	export interface Connection {
		readonly Connected: boolean;

		Disconnect(): void;
		IsConnected(): boolean;
	}

	// AGF Version of Signal
	export interface AGFClient<S extends Callback = Callback, R extends Callback = Callback> {
		Fire(...args: Parameters<S>): void;
		Wait(): LuaTuple<Parameters<R>>;
		WaitPromise(): Promise<Parameters<R>[0]>;
		Connect(handler: R): Signal.Connection;
		DisconnectAll(): void;
		Destroy(): void;
	}
}
interface Signal<T extends Callback = Callback> {
	Fire(...args: Parameters<T>): void;
	Wait(): LuaTuple<Parameters<T>>;
	WaitPromise(): Promise<Parameters<T>[0]>;
	Connect(handler: T): Signal.Connection;
	DisconnectAll(): void;
	Destroy(): void;
}

interface SignalConstructor {
	new <T extends Callback = Callback>(maid?: Maid): Signal<T>;
	readonly Is: (obj: unknown) => obj is Signal<Callback>;
	readonly Proxy: <T extends Callback>(rbxScriptSignal: RBXScriptSignal<T>, maid?: Maid) => Signal<T>;
}

declare const Signal: SignalConstructor;
export = Signal;
