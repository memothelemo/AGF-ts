import Aero from "Framework/Internal/Aero";

declare global {
	interface AeroServerModules {
		TestServerModule: TestServerModule;
	}
}

class TestServerModule extends Aero.ServerModule {
	TestAGF() {
		print("From server: AGF Module interaction is working");
	}
}

export = TestServerModule;
