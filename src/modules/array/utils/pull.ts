import { includes } from "#modules/array/utils/includes";
import { pullBy } from "#modules/array/utils/pullBy";
import type { Maybe } from "#types/Maybe";

/**
 * Removes in place every item of an array matching one of the values, compared
 * by SameValueZero so `NaN` matches `NaN`, keeping the others in order; holes
 * read as `undefined`. Returns the removed items in a new array, as `splice`. A
 * nullish array returns `undefined`.
 */
export function pull<Item>(array: Item[], ...values: NoInfer<Item>[]): Item[];
export function pull<Item>(
  array: Maybe<Item[]>,
  ...values: NoInfer<Item>[]
): Item[] | undefined;
export function pull(
  array: Maybe<unknown[]>,
  ...values: unknown[]
): unknown[] | undefined {
  return pullBy(array, (value) => includes(values, value));
}
