/**
 * Returns whether the value is below zero; `false` for `NaN` and `-0`.
 */
export function isNegative(value: number): boolean;
export function isNegative(value: bigint): boolean;
export function isNegative(value: number | bigint): boolean {
  return value < 0;
}
