import { isFunction } from "#modules/function/guards/isFunction";
import type { Comparator } from "#modules/array/types/Comparator";
import type { SortOptions } from "#modules/array/types/SortOptions";

function reverseStringOrder(left: unknown, right: unknown): number {
  const leftString = String(left);
  const rightString = String(right);

  if (leftString < rightString) {
    return 1;
  }

  return leftString > rightString ? -1 : 0;
}

/**
 * Resolves the `(comparator?, options?)` or `(options)` arguments of the ordering
 * helpers to the comparator to sort with, negated when reversed; `undefined`
 * keeps the native string order.
 */
export function resolveComparator<Item>(
  comparatorOrOptions: Comparator<Item> | SortOptions | undefined,
  options: SortOptions | undefined,
): Comparator<Item> | undefined {
  const comparator = isFunction(comparatorOrOptions)
    ? comparatorOrOptions
    : undefined;

  const reverse = isFunction(comparatorOrOptions)
    ? options?.reverse
    : (comparatorOrOptions ?? options)?.reverse;

  if (!reverse) {
    return comparator;
  }

  if (comparator == null) {
    return reverseStringOrder;
  }

  return (left, right) => {
    return -comparator(left, right) || 0;
  };
}
