import { isFunction } from "#modules/function/guards/isFunction";
import type { Maybe } from "#types/Maybe";

/**
 * Removes in place the items of an array the predicate accepts, keeping the
 * others in order; the predicate receives each item with its original index, and
 * holes read as `undefined`. Returns the removed items in a new array. A nullish
 * array returns `undefined`.
 *
 * @throws {TypeError} when the predicate is not a function.
 */
export function pullBy<Item>(
  array: Item[],
  predicate: (value: Item, index: number) => unknown,
): Item[];
export function pullBy<Item>(
  array: Maybe<Item[]>,
  predicate: (value: Item, index: number) => unknown,
): Item[] | undefined;
export function pullBy(
  array: Maybe<unknown[]>,
  predicate: (value: unknown, index: number) => unknown,
): unknown[] | undefined {
  if (array == null) {
    return;
  }

  if (!isFunction(predicate)) {
    throw new TypeError("Expected a predicate function.");
  }

  const removed: unknown[] = [];

  let length = 0;

  for (let index = 0; index < array.length; index++) {
    const value = array[index];

    if (predicate(value, index)) {
      removed.push(value);
    } else {
      array[length++] = value;
    }
  }

  array.length = length;

  return removed;
}
