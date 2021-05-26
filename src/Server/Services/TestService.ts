import Aero from "Framework/Internal/Aero";

declare global {
	interface GlobalAeroServices {
		TestService: TestService;
	}
	interface ClientToServerServices {
		TestService: TestServiceClient;
	}
	interface AeroServerEvents {
		MyInternalEvent: (str: string) => void;
	}
}

type TestType = LuaTuple<[string, boolean]>;

export default class TestService extends Aero.Service<"TestService"> {
	// Responsible for initializing TestService
	Init() {
		this.RegisterEvent("MyInternalEvent");
	}

	// Responsible for starting TestService
	Start() {
		this.ConnectEvent("MyInternalEvent", (str) => {
			print(str);
		});
		this.TestAGF();
	}

	// Do some AGF Test
	TestAGF() {
		this.Modules.TestServerModule.TestAGF();
		this.Fire("MyInternalEvent", "AGF server events are working");

		const wrapModuleTest = this.WrapModule({
			Pi: math.pi,

			Init() {
				print("Initializing wrapped module");
			},
			Start() {
				print("Starting wrapped module");
				this.TestWrappedModule();
			},
			TestWrappedModule() {
				print("Wrapped module is working!");
			},
			TestWrappedModuleExternal() {
				print("Wrapped module is running outside the Wrapped module table");
			},
			TestArgument(pi: number) {
				assert(pi === math.pi, "pi argument isn't matched?");
				print("Pi argument matched");
			},
			TestPi() {
				assert(this.Pi === math.pi, "self.Pi isn't matched?");
				print("Pi variable matched");
			},
		});

		wrapModuleTest.TestWrappedModuleExternal();
		wrapModuleTest.TestArgument(math.pi);
		wrapModuleTest.TestPi();

		this.ConnectClientEvent("TestClientEvent", (player) => {
			print(player.Name);
		});

		game.GetService("Players").PlayerAdded.Connect((player) => {
			player.CharacterAdded.Connect(() => {
				wait(5);
				this.FireClient("TestClientEvent", player, "Is it working?");
			});
		});
	}
}

export class TestServiceClient extends Aero.ClientToServer<"TestService"> {
	TestClientFunction = Aero.ClientFunction<(callbackString: string) => TestType>((player, callbackString) => {
		assert(classIs(player, "Player"), "Something went wrong when delivering TestClientFunction");
		this.Server.Modules.TestServerModule.TestAGF();
		return callbackString as unknown as TestType;
	});
	TestClientAsyncFunction = Aero.ClientFunctionAsync<(callbackString: string) => TestType>(
		(player, callbackString) => {
			assert(classIs(player, "Player"), "Something went wrong when delivering TestClientFunction");
			this.Server.Modules.TestServerModule.TestAGF();
			return callbackString as unknown as TestType;
		},
	);
	TestClientEvent = Aero.ClientEvent<(callbackString: string) => void, () => void>("TestClientEvent");
}
