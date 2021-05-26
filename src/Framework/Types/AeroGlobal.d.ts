import Aero from "Framework/Internal/Aero";

declare global {
	/* LUA GLOBAL */
	interface _G {
		WaitForAero: () => void;
		WaitForAeroPromise: () => Promise<void>;

		AeroServer: {
			Services: GlobalAeroServices;
			Modules: AeroServerModules;
			Shared: GlobalAeroShared;
		};

		AeroClient: {
			Controllers: GlobalAeroControllers;
			Modules: AeroClientModules;
			Shared: GlobalAeroShared;
		};
	}

	/* GLOBAL */
	interface GlobalAeroServices {}
	interface GlobalAeroControllers {}
	interface GlobalAeroShared {}

	/* CLIENT-TO-SERVER CONNECTIONS */
	interface ClientToServerServices {}

	/* CLIENT INTERACTIONS */
	interface AeroClientModules {}
	interface AeroClientEvents {}

	/* SERVER INTERACTIONS */
	interface AeroServerModules {}
	interface AeroServerEvents {}
}
