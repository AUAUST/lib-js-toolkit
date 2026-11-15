import type { Maybe } from "#types/Maybe";

/**
 * Copies an array into a new sorted array with a comparator, by default in
 * ascending order of the items' string forms, `undefined` and holes last, as
 * with `Array.prototype.toSorted`. A nullish array returns `undefined`.
 *
 * @native equal Array.prototype.toSorted
 */
export function toSorted<Items extends readonly unknown[]>(
  array: Items,
  comparator?: (left: Items[number], right: Items[number]) => number,
): Items[number][];
export function toSorted<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  comparator?: (left: Items[number], right: Items[number]) => number,
): Items[number][] | undefined;
export function toSorted(
  array: Maybe<readonly unknown[]>,
  comparator?: (left: unknown, right: unknown) => number,
): unknown[] | undefined {
  return array?.toSorted(comparator);
}
