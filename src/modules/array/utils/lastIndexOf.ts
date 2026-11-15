import { sameValueZero } from "#modules/general/utils/sameValueZero";
import { min } from "#modules/math/utils/min";
import { trunc } from "#modules/math/utils/trunc";
import { isNaN } from "#modules/number/guards/isNaN";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the last index of the value in an array, or `-1` when absent, compared
 * by SameValueZero so `NaN` matches `NaN`, unlike `Array.prototype.lastIndexOf`.
 * The search runs backwards from `fromIndex`, the last index by default,
 * a negative one counted from the end; holes are skipped. A nullish array
 * returns `undefined`.
 *
 * @native variant Array.prototype.lastIndexOf
 */
export function lastIndexOf<Items extends readonly unknown[]>(
  array: Items,
  value: NoInfer<Items[number]>,
  fromIndex?: number,
): number;
export function lastIndexOf<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  value: NoInfer<Items[number]>,
  fromIndex?: number,
): number | undefined;
export function lastIndexOf(
  array: Maybe<readonly unknown[]>,
  value: unknown,
  fromIndex?: number,
): number | undefined {
  if (array == null) {
    return;
  }

  const position = fromIndex === undefined
    ? array.length - 1
    : isNaN(fromIndex)
      ? 0
      : trunc(fromIndex);

  const start = position < 0
    ? array.length + position
    : min(position, array.length - 1);

  for (let index = start; index >= 0; index--) {
    if (index in array && sameValueZero(array[index], value)) {
      return index;
    }
  }

  return -1;
}
