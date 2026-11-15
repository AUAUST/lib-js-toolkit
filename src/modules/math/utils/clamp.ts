import { max as maxOf } from "#modules/math/utils/max";
import { min as minOf } from "#modules/math/utils/min";

export function clamp(value: number, min: number, max: number): number {
  return minOf(maxOf(value, min), max);
}
