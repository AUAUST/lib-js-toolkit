import { valueOf } from "#modules/general/utils/valueOf";
import { isBigInt } from "#modules/guard/guards/isBigInt";
import { isNaN } from "#modules/number/guards/isNaN";
import { isNumber } from "#modules/number/guards/isNumber";

function isOrderedNumber(value: unknown): value is number | bigint {
  return (isNumber(value) && !isNaN(value)) || isBigInt(value);
}

function rankOf(value: unknown): 1 | 2 | 3 {
  if (isOrderedNumber(value)) {
    return 1;
  }

  return isNaN(value) ? 2 : 3;
}

function isNegativeZero(value: number | bigint): boolean {
  return isNumber(value) && value === 0 && 1 / value < 0;
}

/**
 * Orders values numerically by their `valueOf`, as an `array` `Comparator`:
 * numbers but `NaN` and bigints together, `-0` before `0`; then `NaN`, invalid
 * dates included; then anything else, numeric strings and booleans included.
 * Values past the first rank tie with their rank. Returns `-1`, `0` or `1`.
 */
export function numeric(left: unknown, right: unknown): -1 | 0 | 1 {
  const leftValue = valueOf(left);
  const rightValue = valueOf(right);

  if (!isOrderedNumber(leftValue) || !isOrderedNumber(rightValue)) {
    const leftRank = rankOf(leftValue);
    const rightRank = rankOf(rightValue);

    if (leftRank === rightRank) {
      return 0;
    }

    return leftRank < rightRank ? -1 : 1;
  }

  if (leftValue < rightValue) {
    return -1;
  }

  if (leftValue > rightValue) {
    return 1;
  }

  const leftNegative = isNegativeZero(leftValue);

  if (leftNegative === isNegativeZero(rightValue)) {
    return 0;
  }

  return leftNegative ? -1 : 1;
}
