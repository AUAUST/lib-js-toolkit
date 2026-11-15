import { hasDuplicates as hasDuplicatesIterable } from "#modules/iterable/utils/hasDuplicates";
import type { Maybe } from "#types/Maybe";

/**
 * Tells whether an array holds an item twice, compared by SameValueZero so `NaN`
 * matches `NaN`, stopping at the first repeat; holes read as `undefined`. A
 * nullish array returns `undefined`.
 */
export function hasDuplicates(array: readonly unknown[]): boolean;
export function hasDuplicates(
  array: Maybe<readonly unknown[]>,
): boolean | undefined;
export function hasDuplicates(
  array: Maybe<readonly unknown[]>,
): boolean | undefined {
  return hasDuplicatesIterable(array);
}
