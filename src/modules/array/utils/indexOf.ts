import { sameValueZero } from "#modules/general/utils/sameValueZero";
import { max } from "#modules/math/utils/max";
import { trunc } from "#modules/math/utils/trunc";
import { isNaN } from "#modules/number/guards/isNaN";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the first index of the value in an array, or `-1` when absent, compared
 * by SameValueZero so `NaN` matches `NaN`, unlike `Array.prototype.indexOf`. The
 * search starts at `fromIndex`, `0` by default, a negative one counted from the
 * end; holes are skipped. A nullish array returns `undefined`.
 *
 * @native variant Array.prototype.indexOf
 */
export function indexOf<Items extends readonly unknown[]>(
  array: Items,
  value: NoInfer<Items[number]>,
  fromIndex?: number,
): number;
export function indexOf<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  value: NoInfer<Items[number]>,
  fromIndex?: number,
): number | undefined;
export function indexOf(
  array: Maybe<readonly unknown[]>,
  value: unknown,
  fromIndex = 0,
): number | undefined {
  if (array == null) {
    return;
  }

  const position = isNaN(fromIndex) ? 0 : trunc(fromIndex);
  const start = position < 0 ? max(array.length + position, 0) : position;

  for (let index = start; index < array.length; index++) {
    if (index in array && sameValueZero(array[index], value)) {
      return index;
    }
  }

  return -1;
}
