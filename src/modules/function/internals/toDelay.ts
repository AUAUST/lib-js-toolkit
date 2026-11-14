import { isNaN } from "#modules/number/guards/isNaN";

/**
 * Coerces a timing argument to milliseconds.
 *
 * @throws {TypeError} when the delay is not a number
 * @throws {RangeError} when the delay is negative
 */
export function toDelay(delay: number, label: string): number {
  // @debt Reuse the number module's toNumber converter instead of native coercion.
  const milliseconds = Number(delay);

  if (isNaN(milliseconds)) {
    throw new TypeError(`Invalid ${label}: ${String(delay)}`, {
      cause: delay,
    });
  }

  if (milliseconds < 0) {
    throw new RangeError(`Invalid ${label}: ${String(delay)} is negative`, {
      cause: delay,
    });
  }

  return milliseconds;
}
