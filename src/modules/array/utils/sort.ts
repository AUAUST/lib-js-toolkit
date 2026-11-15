import type { Maybe } from "#types/Maybe";

/**
 * Sorts an array in place with a comparator, by default in ascending order of the
 * items' string forms, `undefined` and holes last, as with `Array.prototype.sort`.
 * Returns the same array. A nullish array returns `undefined`.
 *
 * @native equal Array.prototype.sort
 */
export function sort<Item>(
  array: Item[],
  comparator?: (left: Item, right: Item) => number,
): Item[];
export function sort<Item>(
  array: Maybe<Item[]>,
  comparator?: (left: Item, right: Item) => number,
): Item[] | undefined;
export function sort(
  array: Maybe<unknown[]>,
  comparator?: (left: unknown, right: unknown) => number,
): unknown[] | undefined {
  return array?.sort(comparator);
}
