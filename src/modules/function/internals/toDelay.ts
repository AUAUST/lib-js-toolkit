import { isNaN } from "#modules/number/guards/isNaN";

/**
 * Coerces a timing argument to milliseconds.
 *
 * @throws {TypeError} when the delay is not a number
 * @throws {RangeError} when the delay is negative
 */
export function toDelay(delay: number): number {
  // @debt Reuse the number module's toNumber converter instead of native coercion.
  const milliseconds = Number(delay);

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
