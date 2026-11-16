import { isBigInt } from "#modules/guard/guards/isBigInt";
import { isNumber } from "#modules/number/guards/isNumber";
import { isBetween } from "#modules/number/utils/isBetween";

/**
 * Returns `function bounded`, telling whether its candidate lies within `min` and
 * `max` as `number.isBetween` does; mixing numbers and bigints gives `false`.
 */
export function between(
  min: number,
  max: number,
): (candidate: number) => boolean;
export function between(
  min: bigint,
  max: bigint,
): (candidate: bigint) => boolean;
export function between(
  min: number | bigint,
  max: number | bigint,
): (candidate: number & bigint) => boolean {
  return function bounded(candidate: number | bigint): boolean {
    // @debt `number.isBetween` has no signature over `number | bigint`, so its operands are narrowed again here.
    if (isNumber(candidate) && isNumber(min) && isNumber(max)) {
      return isBetween(candidate, min, max);
    }

    if (isBigInt(candidate) && isBigInt(min) && isBigInt(max)) {
      return isBetween(candidate, min, max);
    }

    return false;
  };
}
