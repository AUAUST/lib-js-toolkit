import { isArray } from "#modules/array/guards/isArray";
import { copyIterable } from "#modules/array/internals/copyIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Copies any iterable but a string once into a new array without holes, keeping
 * the order. A nullish iterable returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable.
 */
export function toCollapsed<Items extends readonly unknown[]>(
  iterable: Items,
): Items[number][];
export function toCollapsed<Item>(iterable: Iterable<Item> & object): Item[];
export function toCollapsed<Items extends readonly unknown[]>(
  iterable: Maybe<Items>,
): Items[number][] | undefined;
export function toCollapsed<Item>(
  iterable: Maybe<Iterable<Item> & object>,
): Item[] | undefined;
export function toCollapsed(
  iterable: Maybe<Iterable<unknown> & object>,
): unknown[] | undefined {
  if (iterable == null) {
    return;
  }

  if (isArray(iterable)) {
    return iterable.filter(() => true);
  }

  return copyIterable(iterable);
}
