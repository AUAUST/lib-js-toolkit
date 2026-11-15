import { isFinite } from "#modules/number/guards/isFinite";

// @debt No `bigint` support: its remainder differs from `number` and mixing both types is unsettled.
/**
 * Returns whether the value is a whole multiple of the divisor; `false` for a
 * `NaN` or infinite value and for a zero or `NaN` divisor.
 */
export function isMultipleOf(value: number, divisor: number): boolean {
  return isFinite(value) && value % divisor === 0;
}
