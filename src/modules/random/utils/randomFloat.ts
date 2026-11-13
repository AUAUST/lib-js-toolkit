import { random } from "#modules/random/utils/random";

/** Returns a float in [min, max), or min for equal bounds. Throws RangeError for nonfinite or reversed bounds. Draws from the host's cryptographically secure generator (`crypto.getRandomValues`), with no guarantee beyond the host's. */
export function randomFloat(min: number, max: number): number {
  if (!Number.isFinite(min) || !Number.isFinite(max) || min > max) {
    throw new RangeError("Bounds must be finite and ordered.");
  }

  if (min === max) {
    return min;
  }

  // @debt Finite extreme bounds can overflow the span subtraction.
  const value = min + random() * (max - min);

  return value === max ? min : value;
}
