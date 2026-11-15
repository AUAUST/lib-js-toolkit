import { round } from "#modules/math/utils/round";
import { isFinite } from "#modules/number/guards/isFinite";

/**
 * Rounds a value to the nearest multiple of `step`.
 *
 * @throws {RangeError} unless `step` is positive and finite.
 */
export function roundTo(value: number, step: number): number {
  if (!isFinite(step) || step <= 0) {
    throw new RangeError("Step must be positive and finite.");
  }

  return round(value / step) * step;
}
