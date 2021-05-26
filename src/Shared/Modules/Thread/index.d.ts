declare global {
	interface GlobalAeroShared {
		Thread: typeof Thread;
	}
}

declare namespace Thread {
	export function SpawnNow<C extends Callback>(func: C, ...args: Parameters<C>): void;
	export function Spawn<C extends Callback>(func: C, ...args: Parameters<C>): void;
	export function Delay<C extends Callback>(waitTime: number, func: C, ...args: Parameters<C>): void;
	export function DelayRepeat<C extends Callback>(intervalTime: number, func: C, ...args: Parameters<C>): void;
}

export = Thread;
