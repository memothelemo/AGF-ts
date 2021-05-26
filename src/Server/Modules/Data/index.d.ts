import Signal from "Shared/Modules/Signal";

declare global {
	interface AeroServerModules {
		Data: typeof Data;
	}
}

type DataMethods = "GetAsync" | "SetAsync" | "RemoveAsync" | "UpdateAsync" | "OnUpdate";

declare class Data<
	E = {
		[index in string]: unknown;
	},
> {
	constructor(name: string, scope: string, ordered: boolean);

	static readonly IsUsingMockService: boolean;
	static readonly AutoSaveInternal: number;
	static readonly PlayerLeftSaveInternal: number;
	static readonly SaveInStudio: boolean;

	OnClose(callback: Callback): void;
	CanAutoSave: boolean;
	DestroyOnLeave: boolean;

	/**
	 * Gets/loads the value from the key. The optional ```defaultValue``` can be used
	 * if the retrieved value from the DataStore is undefined. This method will only
	 * call the DataStore if it has not yet done so and gotten a non-undefined value. If
	 * a call has already been made for the given key, the value will be cached
	 * and the cached value will be returned.
	 * @param key - keyof Data
	 * @param defaultValue - ```undefined | Data[key]```
	 * @returns ```Promise<defaultValue extends undefined ? Data[Key] : Data[Key] | defaultValue>```
	 */
	Get<K extends keyof E, D extends unknown = undefined>(
		key: K,
		defaultValue?: D,
	): Promise<D extends undefined ? E[K] : E[K] | D>;

	/**
	 * Sets the value to the given key in the local cache. This does NOT set the
	 * value in the DataStore. Call ```Save``` or ```SaveAll``` to explicitly save to the
	 * DataStore. Otherwise, the key will automatically save during the auto-save
	 * period, when the player leaves, or when the server shuts down.
	 *
	 * If you try to set a value to a key that has not yet been cached, it will
	 * first try to call the DataStore to ensure it is working. If DataStores
	 * are down, this call will fail, ensuring that you don't start overriding
	 * values during DataStore downtime.
	 * @param key keyof Data
	 * @value Data[key]
	 * @returns Promise<void>
	 */
	Set<K extends keyof E>(key: K, value: E[K]): Promise<void>;

	/**
	 * This deletes the value from the cache AND the DataStore. This is the same
	 * as calling ```data.Set("key", undefined)``` but is preferred for its explicit naming.
	 * @param key - keyof Data
	 * @returns Promise<void>
	 */
	Delete<K extends keyof E>(key: K): Promise<void>;

	/**
	 * This increments a value on a given key. If the current value doesn't exist,
	 * then it will assume a starting value of 0. This will fail if the increment
	 * or the existing value is not a number.
	 * @param key Key that returns a number
	 * @returns Promise<Data[key]>
	 */
	Increment<K extends keyof E, V = E[K] extends number ? number : never>(key: K, increment: V): Promise<E[K]>;

	/**
	 * This registers a function to listen for changes on a key at the DataStore
	 * level, NOT the cache level. Thus, using 'data:Set()' won't trigger a bound
	 * function on OnUpdate. In other words, this function can be used to tell
	 * when a key has been saved onto the DataStore.
	 * @param key keyof Data
	 * @param callback (isSaved: boolean) => void
	 * @returns Promise<void>
	 */
	OnUpdate<K extends keyof E>(key: K, callback: (isSaved: boolean) => void): Promise<void>;

	/**
	 * Sets the value to the given key in the local cache. This does NOT set the
	 * value in the DataStore. Call 'Save' or 'SaveAll' to explicitly save to the
	 * DataStore. Otherwise, the key will automatically save during the auto-save
	 * period, when the player leaves, or when the server shuts down.
	 * If you try to set a value to a key that has not yet been cached, it will
	 * first try to call the DataStore to ensure it is working. If DataStores
	 * are down, this call will fail, ensuring that you don't start overriding
	 * values during DataStore downtime.
	 * @param key keyof Data
	 * @returns Promise<void>
	 */
	Save<K extends keyof E>(key: K): Promise<void>;

	/**
	 * Saves all currently cached keys to the DataStore.
	 * @returns Promise<void>
	 */
	SaveAll(): Promise<void>;

	/**
	 * Marks the key as dirty, which means that it will be forced to save the
	 * next time a save invocation occurs. This is necessary when making changes
	 * to tables.
	 * @param key keyof Data
	 * @returns void
	 */
	MarkDirty<K extends keyof E>(key: K): void;

	Success: Signal<(method: DataMethods, key: keyof E) => void>;
	Failed: Signal<(method: DataMethods, key: keyof E, errorText: string) => void>;

	public ForPlayer(userId: number, ordered?: boolean): Data;
	public ForServer(ordered?: boolean): Data;
}

export = Data;
