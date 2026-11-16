import { compareStringForms } from "#modules/array/internals/compareStringForms";
import { isFunction } from "#modules/function/guards/isFunction";
import type { Comparator } from "#modules/array/types/Comparator";
import type { SortOptions } from "#modules/array/types/SortOptions";

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

  const ordered = comparator ?? compareStringForms;

  return (left, right) => {
    return -ordered(left, right) || 0;
  };
}
