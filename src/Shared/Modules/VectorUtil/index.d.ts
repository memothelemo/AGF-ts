declare global {
	interface GlobalAeroShared {
		VectorUtil: typeof VectorUtil;
	}
}

declare namespace VectorUtil {
	/**
	 * Clamps the magnitude of a vector so it is only a certain length.
	 * ```
	 * ClampMagnitude(Vector3.new(100, 0, 0), 15) == Vector3.new(15, 0, 0)
	 * ClampMagnitude(Vector3.new(10, 0, 0), 20)  == Vector3.new(10, 0, 0)
	 * ```
	 * @param vector
	 * @param maxMagnitude
	 */
	export function ClampMagnitude(vector: Vector3, maxMagnitude: number): Vector3;

	/**
	 * Finds the angle (in radians) between two vectors.
	 * ```
	 * v1 = Vector3.new(10, 0, 0)
	 * v2 = Vector3.new(0, 10, 0)
	 * AngleBetween(v1, v2) == math.rad(90)
	 * ```
	 * @param vector1
	 * @param vector2
	 */
	export function AngleBetween(vector1: Vector3, vector2: Vector3): number;

	/**
	 * Same as AngleBetween, but returns a signed value.
	 * ```
	 * v1 = Vector3.new(10, 0, 0)
	 * v2 = Vector3.new(0, 0, -10)
	 * axis = Vector3.new(0, 1, 0)
	 * AngleBetweenSigned(v1, v2, axis) == math.rad(90)
	 * ```
	 * @param vector1
	 * @param vector2
	 * @param axisVector
	 */
	export function AngleBetweenSigned(vector1: Vector3, vector2: Vector3, axisVector: Vector3): number;
}

export = VectorUtil;
