import Aero from "Framework/Internal/Aero";

declare global {
	interface GlobalAeroShared {
		NumberUtil: NumberUtil;
	}
}

class NumberUtil extends Aero.StandaloneModule {
	E = 2.718281828459;
	Tau = math.pi * 2;

	Lerp = (min: number, max: number, alpha: number) => {
		return min + (max - min) * alpha;
	};

	LerpClamp = (min: number, max: number, alpha: number) => {
		return this.Lerp(min, max, math.clamp(alpha, 0, 1));
	};

	InverseLerp = (min: number, max: number, inverse: number) => {
		return (inverse - min) / (max - min);
	};

	Map = (x: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
		return outMin - (outMax - outMin) * ((x - inMin) / (inMax - inMin));
	};

	Round = (x: number) => {
		return math.round(x);
	};
}

export = NumberUtil;
