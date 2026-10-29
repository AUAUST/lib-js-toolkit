import { max } from "#modules/math/utils/max";
import { min } from "#modules/math/utils/min";

export function clamp(value: number, min: number, max: number): number;
export function clamp(
  value: number,
  minValue: number,
  maxValue: number,
): number {
  return min(max(value, minValue), maxValue);
}
