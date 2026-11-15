import { unique } from "#modules/iterable/utils/unique";
import type { Maybe } from "#types/Maybe";

/**
 * Removes the repeated items of an array in place, keeping each first occurrence
 * in order, compared by SameValueZero so `NaN` matches `NaN`; holes read as
 * `undefined`. Returns the same array. A nullish array returns `undefined`.
 */
export function deduplicate<Item>(array: Item[]): Item[];
export function deduplicate<Item>(array: Maybe<Item[]>): Item[] | undefined;
export function deduplicate(array: Maybe<unknown[]>): unknown[] | undefined {
  if (array == null) {
    return;
  }

  let length = 0;

  for (const value of unique(array)) {
    array[length++] = value;
  }

  array.length = length;

  return array;
}
