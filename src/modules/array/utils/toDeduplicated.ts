import { isArray } from "#modules/array/guards/isArray";
import { copyIterable } from "#modules/array/internals/copyIterable";
import { deduplicate } from "#modules/array/utils/deduplicate";
import { unique } from "#modules/iterable/utils/unique";
import type { Maybe } from "#types/Maybe";

/**
 * Copies the distinct items of any iterable but a string once into a new
 * array, keeping each first occurrence in order, compared by SameValueZero
 * so `NaN` matches `NaN`; holes read as `undefined`. A nullish iterable
 * returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable.
 */
export function toDeduplicated<Items extends readonly unknown[]>(
  iterable: Items,
): Items[number][];
export function toDeduplicated<Item>(iterable: Iterable<Item> & object): Item[];
export function toDeduplicated<Items extends readonly unknown[]>(
  iterable: Maybe<Items>,
): Items[number][] | undefined;
export function toDeduplicated<Item>(
  iterable: Maybe<Iterable<Item> & object>,
): Item[] | undefined;
export function toDeduplicated(
  iterable: Maybe<Iterable<unknown> & object>,
): unknown[] | undefined {
  if (iterable == null) {
    return;
  }

  if (isArray(iterable)) {
    return Array.from(unique(iterable));
  }

  return deduplicate(copyIterable(iterable));
}
