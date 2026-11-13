import { isFinite } from "#modules/number/guards/isFinite";
import { random } from "#modules/random/utils/random";

/** Returns a float in [min, max), or min for equal bounds. Throws RangeError for nonfinite or reversed bounds. Draws from the host's cryptographically secure generator (`crypto.getRandomValues`), with no guarantee beyond the host's. */
export function randomFloat(min: number, max: number): number {
  if (!isFinite(min) || !isFinite(max) || min > max) {
    throw new RangeError("Bounds must be finite and ordered.");
  }

  if (min === max) {
    return min;
  }

  const span = max - min;
  const fraction = random();

  const value = isFinite(span)
    ? min + fraction * span
    : (1 - fraction) * min + fraction * max;

  return value === max ? min : value;
}
