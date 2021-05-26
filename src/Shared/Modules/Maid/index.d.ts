import { Connection } from "../Signal";

declare global {
	interface GlobalAeroShared {
		Maid: typeof Maid;
	}
}

declare namespace Maid {
	export type Destroyable =
		| RBXScriptConnection
		| Connection
		| Callback
		| {
				Destroy(): void;
		  }
		| Promise<unknown>;
}

type Maid<
	I extends Partial<
		{
			[index in keyof I]: Maid.Destroyable;
		}
	> = {},
> = I & {
	GiveTask(task: Maid.Destroyable): void;
	GivePromise<P extends Promise<unknown>>(promise: P): Promise<P>;
	DoCleaning(): void;
	Destroy(): void;
};

interface MaidConstructor {
	new <I = {}>(): Maid<I>;
}

declare const Maid: MaidConstructor;
export = Maid;
