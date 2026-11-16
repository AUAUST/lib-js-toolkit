import { resolveComparator } from "#modules/array/internals/resolveComparator";
import type { Comparator } from "#modules/array/types/Comparator";
import type { SortOptions } from "#modules/array/types/SortOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Sorts an array in place with a comparator, by default in ascending order of the
 * items' string forms, `undefined` and holes last, as with `Array.prototype.sort`.
 * `reverse` negates the order in the same pass. Returns the same array. A nullish
 * array returns `undefined`.
 *
 * @native variant Array.prototype.sort
 */
export function sort<Item>(
  array: Item[],
  comparator?: Comparator<Item>,
  options?: SortOptions,
): Item[];
export function sort<Item>(array: Item[], options: SortOptions): Item[];
export function sort<Item>(
  array: Maybe<Item[]>,
  comparator?: Comparator<Item>,
  options?: SortOptions,
): Item[] | undefined;
export function sort<Item>(
  array: Maybe<Item[]>,
  options: SortOptions,
): Item[] | undefined;
export function sort(
  array: Maybe<unknown[]>,
  comparatorOrOptions?: Comparator<unknown> | SortOptions,
  options?: SortOptions,
): unknown[] | undefined {
  return array?.sort(resolveComparator(comparatorOrOptions, options));
}
