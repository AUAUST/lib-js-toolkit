import { isArray } from "#modules/array/guards/isArray";
import { copyIterable } from "#modules/array/internals/copyIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Copies any iterable but a string once into a new array in reverse order;
 * holes read as `undefined`, as with `Array.prototype.toReversed`. A nullish
 * iterable returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable.
 * @native variant Array.prototype.toReversed
 */
export function toReversed<Items extends readonly unknown[]>(
  iterable: Items,
): Items[number][];
export function toReversed<Item>(iterable: Iterable<Item> & object): Item[];
export function toReversed<Items extends readonly unknown[]>(
  iterable: Maybe<Items>,
): Items[number][] | undefined;
export function toReversed<Item>(
  iterable: Maybe<Iterable<Item> & object>,
): Item[] | undefined;
export function toReversed(
  iterable: Maybe<Iterable<unknown> & object>,
): unknown[] | undefined {
  if (iterable == null) {
    return;
  }

  if (isArray(iterable)) {
    return iterable.toReversed();
  }

  return copyIterable(iterable).reverse();
}
