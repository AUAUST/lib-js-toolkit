import { isNaN } from "#modules/number/guards/isNaN";

/**
 * Compares with the SameValueZero algorithm: `===`, except that `NaN` equals
 * `NaN`.
 */
export function sameValueZero(a: unknown, b: unknown): boolean {
  return a === b || (isNaN(a) && isNaN(b));
}
