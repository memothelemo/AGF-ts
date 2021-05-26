declare namespace Settings {
	export interface Entries {
		Order: number;
		PreventInit: boolean;
		PreventStart: boolean;
		Standalone: boolean;
	}

	export function GetDefault(): Entries;
	export function Get(moduleScript: ModuleScript, shouldCache: boolean): Entries;
	export function IsSettingsModule(moduleScript: ModuleScript): boolean;
}

export = Settings;
