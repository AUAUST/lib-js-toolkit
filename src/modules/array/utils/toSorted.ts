import { isArray } from "#modules/array/guards/isArray";
import { copyIterable } from "#modules/array/internals/copyIterable";
import type { Comparator } from "#modules/array/types/Comparator";
import type { Maybe } from "#types/Maybe";

/**
 * Copies any iterable but a string once into a new sorted array with a
 * comparator, by default in ascending order of the items' string forms,
 * `undefined` and holes last, as with `Array.prototype.toSorted`. A nullish
 * iterable returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable.
 * @native variant Array.prototype.toSorted
 */
export function toSorted<Items extends readonly unknown[]>(
  iterable: Items,
  comparator?: Comparator<Items[number]>,
): Items[number][];
export function toSorted<Item>(
  iterable: Iterable<Item> & object,
  comparator?: Comparator<Item>,
): Item[];
export function toSorted<Items extends readonly unknown[]>(
  iterable: Maybe<Items>,
  comparator?: Comparator<Items[number]>,
): Items[number][] | undefined;
export function toSorted<Item>(
  iterable: Maybe<Iterable<Item> & object>,
  comparator?: Comparator<Item>,
): Item[] | undefined;
export function toSorted(
  iterable: Maybe<Iterable<unknown> & object>,
  comparator?: Comparator<unknown>,
): unknown[] | undefined {
  if (iterable == null) {
    return;
  }

  if (isArray(iterable)) {
    return iterable.toSorted(comparator);
  }

  return copyIterable(iterable).sort(comparator);
}
