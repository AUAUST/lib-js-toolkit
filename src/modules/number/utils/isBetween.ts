/**
 * Returns whether the value lies within `min` and `max`, both inclusive;
 * infinities compare as ordinary bounds and any `NaN` gives `false`.
 */
export function isBetween(value: number, min: number, max: number): boolean;
export function isBetween(value: bigint, min: bigint, max: bigint): boolean;
export function isBetween(
  value: number | bigint,
  min: number | bigint,
  max: number | bigint,
): boolean {
  return min <= value && value <= max;
}
