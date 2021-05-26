import Signal from "Shared/Modules/Signal";

type STCS_NS_CE<SC extends Callback = Callback, CS extends Callback = Callback> = {
	[index in keyof ClientToServerServices]: ExtractMembers<ClientToServerServices[index], Aero.TClientEvent<SC, CS>>;
};

/**
 * Typings for AeroGameFramework
 */
declare namespace Aero {
	/**
	 * A service is a singleton initiated at runtime on the server.
	 * Services should serve specific purposes.
	 *
	 * **Note:**
	 * This class is generic. So you have to specify what class
	 * is this and you have to register its class in
	 * GlobalAeroServices interface
	 *
	 * @example
	 * declare global {
	 * 		interface GlobalAeroServices {
	 * 	  		ExampleService: ExampleService;
	 * 		}
	 * }
	 *
	 * export default class ExampleService extends Aero.Service<"ExampleService"> {
	 * 		Init() {
	 * 		}
	 *
	 * 		Start() {
	 * 		}
	 * }
	 */
	abstract class Service<S extends keyof GlobalAeroServices> {
		Disabled?: boolean;

		/**
		 * The ```Start``` method is called after all services have been initialized
		 * (i.e. their Init methods have been fully executed).
		 *
		 * Each ```Start``` method is executed on a separate thread (asynchronously).
		 * From here, it is safe to reference and invoke other services in the framework.
		 */
		Start(): void;

		/**
		 * The ```Init``` method is called on each service in the framework
		 * in a synchronous and linear progression. In other words,
		 * each service's ```Init``` method is invoked one after the other.
		 * Each ```Init``` method must fully execute before moving onto the next.
		 * This is essentially the constructor for the service singleton.
		 *
		 * The method should be used to set up your service.
		 * For instance, you might want to create events or reference other services.
		 * Use the ```Init``` method to register events and initialize any necessary components
		 * before the Start method is invoked.
		 */
		Init(): void;

		Services: GlobalAeroServices;
		Modules: AeroServerModules;
		Shared: GlobalAeroShared;

		/**
		 * Registers an server framework event
		 *
		 * **Note:**
		 * Make sure you setup the event from ```AeroGlobal.d.ts``` or
		 * you have to declare it in the service script
		 *
		 * @example
		 * declare global {
		 * 		interface GlobalAeroServices {
		 * 	  		ExampleService: ExampleService;
		 * 		}
		 *
		 * 		interface AeroServerInternalEvents {
		 * 			Foo: (str: string) => void;
		 * 		}
		 * }
		 *
		 * export default class ExampleService extends Aero.Service<"ExampleService"> {
		 * 		Init() {
		 * 			this.RegisterEvent("Foo");
		 * 		}
		 *
		 * 		Start() {
		 * 			this.ConnectEvent("Foo", (str) => {
		 * 				print(str);
		 * 			});
		 * 		}
		 * }
		 *
		 * @param eventName
		 */
		RegisterEvent<E extends keyof AeroServerEvents>(eventName: E): Signal<AeroServerEvents[E]>;

		/**
		 * Invokes the server framework event
		 */
		Fire<E extends keyof AeroServerEvents>(eventName: E, ...args: Parameters<AeroServerEvents[E]>): void;

		/**
		 * Waits for server framework event to invoke once
		 */
		WaitForEvent<E extends keyof AeroServerEvents>(eventName: E): ReturnType<AeroServerEvents[E]>;

		/**
		 * Captures invoke from the server framework event.
		 * @param eventName
		 * @param callback
		 */
		ConnectEvent<E extends keyof AeroServerEvents>(eventName: E, callback: AeroServerEvents[E]): Signal.Connection;

		// CLIENT EVENTS

		/**
		 * Invokes ClientEvent from a specific client / player
		 * @param eventName
		 * @param client
		 * @param ...args
		 */
		FireClient<E extends keyof STCS_NS_CE[S]>(
			eventName: E,
			client: Player,
			...args: STCS_NS_CE[S][E] extends Aero.TClientEvent<infer U, Callback> ? Parameters<U> : never
		): void;

		/**
		 * Invokes ClientEvent from all players on the active server
		 * @param eventName
		 * @param ...args
		 */
		FireAllClients<E extends keyof STCS_NS_CE[S]>(
			eventName: E,
			...args: STCS_NS_CE[S][E] extends Aero.TClientEvent<infer U, Callback> ? Parameters<U> : never
		): void;

		/**
		 * Invokes ClientEvent from all players but it filters excepted clients
		 * @param eventName
		 * @param clientIgnore
		 * @param args
		 */
		FireOtherClients<E extends keyof STCS_NS_CE[S]>(
			eventName: E,
			clientIgnore: Player[],
			...args: STCS_NS_CE[S][E] extends Aero.TClientEvent<infer U, Callback> ? Parameters<U> : never
		): void;

		/**
		 * Captures ongoing ClientEvent request from the Client
		 */
		ConnectClientEvent<E extends keyof STCS_NS_CE[S]>(
			eventName: E,
			callback: STCS_NS_CE<Callback, Callback>[S][E] extends STCS_NS_CE<Callback, infer C>[S][E]
				? (player: Player, ...args: Parameters<C>) => ReturnType<C>
				: never,
		): void;

		/**
		 * Waits for the ClientEvent to request from the client
		 */
		WaitForClientEvent<E extends keyof STCS_NS_CE[S]>(
			eventName: E,
		): STCS_NS_CE[S][E] extends Aero.TClientEvent<Callback, infer U> ? ReturnType<U> : never;

		/**
		 * The ```WrapModule``` method can be used to transform a
		 * table into a framework-like module.
		 *
		 * In other words, it sets the table's metatable
		 * to the same metatable used by other framework modules,
		 * thus exposing the server framework to the given table.
		 */
		WrapModule<M = {}>(module: M & Partial<Aero.ServerModule>): M & Aero.ServerModule;
	}

	/**
	 * A controller is a singleton initiated at runtime on the client.
	 * Controllers should serve a specific purpose.
	 *
	 * **Note:**
	 * You may export a module only as a class, but the author recommends to
	 * use ```export default class ExampleController extends Aero.Controller```
	 * to make it unifed across from services to the rest of the client controllers
	 *
	 * @example
	 * declare global {
	 * 		interface GlobalAeroControllers {
	 * 	  		ExampleService: ExampleControllers;
	 * 		}
	 * }
	 *
	 * export default class ExampleController extends Aero.Controller {
	 * 		Init() {
	 * 		}
	 *
	 * 		Start() {
	 * 		}
	 * }
	 */
	abstract class Controller {
		Disabled?: boolean;

		/**
		 * The ```Start``` method is called after all controllers have been initialized
		 * (i.e. their Init methods have been fully executed).
		 *
		 * Each ```Start``` method is executed on a separate thread (asynchronously).
		 * From here, it is safe to reference and invoke other controllers in the framework.
		 */
		Start(): void;

		/**
		 * The ```Init``` method is called on each controller in the framework
		 * in a synchronous and linear progression. In other words,
		 * each controller's ```Init``` method is invoked one after the other.
		 *
		 * Each ```Init``` method must fully execute before moving onto the next.
		 * This is essentially the constructor for the controller singleton.
		 *
		 * The method should be used to set up your controller. For instance,
		 * you might want to create events or reference other controllers.
		 *
		 * Use the ```Init``` method to register events and initialize any necessary
		 * components before the Start method is invoked.
		 */
		Init(): void;

		Services: {
			[index in keyof ClientToServerServices]: Omit<
				{
					[event in keyof ClientToServerServices[index]]: ClientToServerServices[index][event] extends TClientEvent<
						infer SC,
						infer CS
					>
						? Signal.AGFClient<CS, SC>
						: ClientToServerServices[index][event];
				},
				"Server"
			>;
		};
		Controllers: GlobalAeroControllers;
		Modules: AeroClientModules;
		Shared: GlobalAeroShared;

		/**
		 * Registers an client framework event
		 *
		 * **Note:**
		 * Make sure you setup the event from ```AeroGlobal.d.ts``` or
		 * you have to declare it in the controller script
		 *
		 * @example
		 * declare global {
		 * 		interface GlobalAeroControllers {
		 * 	  		ExampleController: ExampleController;
		 * 		}
		 *
		 * 		interface AeroClientInternalEvents {
		 * 			Foo: (str: string) => void;
		 * 		}
		 * }
		 *
		 * export default class ExampleController extends Aero.Service<"ExampleController"> {
		 * 		Init() {
		 * 			this.RegisterEvent("Foo");
		 * 		}
		 *
		 * 		Start() {
		 * 			this.ConnectEvent("Foo", (str) => {
		 * 				print(str);
		 * 			});
		 * 		}
		 * }
		 *
		 * @param eventName
		 */
		RegisterEvent<E extends keyof AeroClientEvents>(eventName: E): Signal<AeroClientEvents[E]>;

		/**
		 * Invokes the client framework event
		 */
		FireEvent<E extends keyof AeroClientEvents>(eventName: E, ...args: Parameters<AeroClientEvents[E]>): void;

		/**
		 * Waits for server framework event to invoke once
		 */
		WaitForEvent<E extends keyof AeroClientEvents>(eventName: E): ReturnType<AeroClientEvents[E]>;

		/**
		 * Captures invoke from the server framework event.
		 * @param eventName
		 * @param callback
		 */
		ConnectEvent<E extends keyof AeroClientEvents>(eventName: E, callback: AeroClientEvents[E]): Signal.Connection;

		/**
		 * The ```WrapModule``` method can be used to transform a
		 * table into a framework-like module.
		 *
		 * In other words, it sets the table's metatable
		 * to the same metatable used by other framework modules,
		 * thus exposing the client framework to the given table.
		 */
		WrapModule<M = {}>(module: M & Partial<Aero.ClientModule>): M & Aero.ClientModule;
	}

	interface Module {
		Start?(): void;
		Init?(): void;
	}

	interface ServerModule {
		Start?(): void;
		Init?(): void;

		Services: GlobalAeroServices;
		Modules: AeroServerModules;
		Shared: GlobalAeroShared;
	}

	abstract class ServerModule {
		Start?(): void;
		Init?(): void;

		Services: GlobalAeroServices;
		Modules: AeroServerModules;
		Shared: GlobalAeroShared;
	}

	interface ClientModule {
		Start?(): void;
		Init?(): void;

		Services: GlobalAeroServices;
		Modules: AeroServerModules;
		Shared: GlobalAeroShared;
	}

	abstract class ClientModule {
		Start?(): void;
		Init?(): void;

		Services: GlobalAeroServices;
		Modules: AeroServerModules;
		Shared: GlobalAeroShared;
	}

	abstract class ClientToServer<S extends keyof GlobalAeroServices> {
		constructor(service: S);
		Server: GlobalAeroServices[S];
	}

	abstract class StandaloneModule {
		Start?(): void;
		Init?(): void;
	}

	type TClientEvent<SC extends Callback, CS extends Callback> = {
		readonly _nominal_symbol: unique symbol;
	};

	export function ClientEvent<SC extends Callback = Callback, CS extends Callback = Callback>(
		name: string,
	): TClientEvent<SC, CS>;

	export function ClientFunction<T extends Callback>(
		func: (player: Player, ...args: Parameters<T>) => ReturnType<T>,
	): (...args: Parameters<T>) => ReturnType<T>;

	export function ClientFunctionAsync<T extends Callback>(
		func: (player: Player, ...args: Parameters<T>) => ReturnType<T>,
	): (...args: Parameters<T>) => Promise<ReturnType<T>>;
}

export = Aero;
