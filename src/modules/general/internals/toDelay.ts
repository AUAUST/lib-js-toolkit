import { isNaN } from "#modules/number/guards/isNaN";

/**
 * Coerces a timing argument to milliseconds.
 * Throws a `TypeError` when it is not a number and a `RangeError` when it is negative.
 */
export function toDelay(delay: number, label: string): number {
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
