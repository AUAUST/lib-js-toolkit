/**
 * Returns whether the value is above zero; `false` for `NaN` and `-0`.
 */
export function isPositive(value: number): boolean;
export function isPositive(value: bigint): boolean;
export function isPositive(value: number | bigint): boolean {
  return value > 0;
}
