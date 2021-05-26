import Signal, { Connection } from "../Signal";

declare global {
	interface GlobalAeroShared {
		ListenerList: typeof ListenerList;
	}
}

declare abstract class ListenerList {
	Connect<E extends RBXScriptSignal>(
		event: E,
		callback: E extends RBXScriptSignal<infer C> ? C : never,
	): RBXScriptConnection;
	Connect<E extends Signal>(event: E, callback: E extends Signal<infer C> ? C : never): Connection;

	BindToRenderStep(name: string, renderPriority: number, callback: (deltaTime: number) => void): void;
	BindAction(
		actionName: string,
		functionToBind: (actionName: string, state: Enum.UserInputState, inputObject: InputObject) => unknown,
	): void;
	BindActionAtPriority(
		actionName: string,
		functionToBind: (actionName: string, state: Enum.UserInputState, inputObject: InputObject) => unknown,
	): void;

	DisconnectEvents(): void;
	DisconnectRenderSteps(): void;
	DisconnectActions(): void;
	DisconnectAll(): void;
	Destroy(): void;
}

export = ListenerList;
