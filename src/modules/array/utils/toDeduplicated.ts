import { unique } from "#modules/iterable/utils/unique";
import type { Maybe } from "#types/Maybe";

/**
 * Copies the distinct items of an array into a new array, keeping each first
 * occurrence in order, compared by SameValueZero so `NaN` matches `NaN`; holes
 * read as `undefined`. A nullish array returns `undefined`.
 */
export function toDeduplicated<Items extends readonly unknown[]>(
  array: Items,
): Items[number][];
export function toDeduplicated<Items extends readonly unknown[]>(
  array: Maybe<Items>,
): Items[number][] | undefined;
export function toDeduplicated(
  array: Maybe<readonly unknown[]>,
): unknown[] | undefined {
  if (array != null) {
    return Array.from(unique(array));
  }
}
