import { resolveComparator } from "#modules/array/internals/resolveComparator";
import { isNotUndefined } from "#modules/guard/guards/isNotUndefined";
import { isNaN } from "#modules/number/guards/isNaN";
import type { Comparator } from "#modules/array/types/Comparator";
import type { SortOptions } from "#modules/array/types/SortOptions";
import type { Maybe } from "#types/Maybe";

function isOrdered<Item>(
  left: Item,
  right: Item,
  comparator: Comparator<Item> | undefined,
): boolean {
  if (!isNotUndefined(right)) {
    return true;
  }

  if (!isNotUndefined(left)) {
    return false;
  }

  if (comparator == null) {
    return String(left) <= String(right);
  }

  const order = comparator(left, right);

  return order <= 0 || isNaN(order);
}

/**
 * Checks whether an array is in the order `Array.prototype.sort` would give it
 * with the same comparator: by default ascending by the items' string forms,
 * compared by UTF-16 code units. `undefined` items and holes come last and
 * never reach the comparator. An empty array is sorted; a nullish array returns
 * `undefined`. `reverse` checks the order `sort` gives with it.
 */
export function isSorted<Item>(
  array: readonly Item[],
  comparator?: Comparator<Item>,
  options?: SortOptions,
): boolean;
export function isSorted<Item>(
  array: readonly Item[],
  options: SortOptions,
): boolean;
export function isSorted<Item>(
  array: Maybe<readonly Item[]>,
  comparator?: Comparator<Item>,
  options?: SortOptions,
): boolean | undefined;
export function isSorted<Item>(
  array: Maybe<readonly Item[]>,
  options: SortOptions,
): boolean | undefined;
export function isSorted<Item>(
  array: Maybe<readonly Item[]>,
  comparatorOrOptions?: Comparator<Item> | SortOptions,
  options?: SortOptions,
): boolean | undefined {
  if (array == null) {
    return;
  }

  const comparator = resolveComparator(comparatorOrOptions, options);

  for (let index = 1; index < array.length; index++) {
    if (!isOrdered(array[index - 1], array[index], comparator)) {
      return false;
    }
  }

  return true;
}
