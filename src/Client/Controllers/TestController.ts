import Aero from "Framework/Internal/Aero";

declare global {
	interface GlobalAeroControllers {
		TestController: TestController;
	}
	interface AeroClientEvents {
		EventTest: (str: string) => void;
	}
}

export default class TestController extends Aero.Controller {
	Init() {
		this.RegisterEvent("EventTest");
	}
	Start() {
		this.ConnectEvent("EventTest", (str) => {
			print(str);
		});

		this.FireEvent("EventTest", "AGF client event is working");

		this.Modules.TestClientModule.TestAGF();
		this.Services.TestService.TestClientFunction("Hello world!");
		this.Services.TestService.TestClientAsyncFunction("Hello").then((value) => {
			print(value);
		});
		this.Services.TestService.TestClientEvent.Fire();
		this.Services.TestService.TestClientEvent.Connect((callbackString) => {
			if (callbackString === "Is it working?") {
				print("Is it working? Yes, it is.");
			} else {
				print("Is it working? Something goes wrong.");
			}
		});
	}
}
