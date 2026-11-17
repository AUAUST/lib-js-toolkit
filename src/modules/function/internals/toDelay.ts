import { isNaN } from "#modules/number/guards/isNaN";
import { toNumber } from "#modules/number/utils/toNumber";

/**
 * Coerces a timing argument to milliseconds.
 *
 * @throws {TypeError} when the delay is not a number
 * @throws {RangeError} when the delay is negative
 */
export function toDelay(delay: number): number {
  const milliseconds = toNumber(delay);

  if (isNaN(milliseconds)) {
    throw new TypeError("A delay must be a number.", {
      cause: delay,
    });
  }

  if (milliseconds < 0) {
    throw new RangeError("A delay must be non-negative.", {
      cause: delay,
    });
  }

  return milliseconds;
}
