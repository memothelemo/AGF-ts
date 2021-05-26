import Aero from "Framework/Internal/Aero";

declare global {
	interface AeroClientModules {
		TestClientModule: TestClientModule;
	}
}

class TestClientModule extends Aero.ClientModule {
	TestAGF() {
		print("From client: AGF Module interaction is working");
	}
}

export = TestClientModule;
