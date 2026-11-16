import { isArray } from "#modules/array/guards/isArray";
import { copyIterable } from "#modules/array/internals/copyIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Flattens nested arrays into a new array up to `depth` levels, one by default,
 * dropping holes, as with `Array.prototype.flat`; a negative depth flattens
 * nothing. Any other iterable but a string is copied once first. A nullish
 * iterable returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable.
 * @native equal Array.prototype.flat
 */
export function flat<
  Items extends readonly unknown[],
  Depth extends number = 1,
>(iterable: Items, depth?: Depth): FlatArray<Items, Depth>[];
export function flat<Item, Depth extends number = 1>(
  iterable: Iterable<Item> & object,
  depth?: Depth,
): FlatArray<Item[], Depth>[];
export function flat<
  Items extends readonly unknown[],
  Depth extends number = 1,
>(iterable: Maybe<Items>, depth?: Depth): FlatArray<Items, Depth>[] | undefined;
export function flat<Item, Depth extends number = 1>(
  iterable: Maybe<Iterable<Item> & object>,
  depth?: Depth,
): FlatArray<Item[], Depth>[] | undefined;
export function flat(
  iterable: Maybe<Iterable<unknown> & object>,
  depth?: number,
): unknown[] | undefined {
  if (iterable == null) {
    return;
  }

  const array = isArray(iterable) ? iterable : copyIterable(iterable);

  return array.flat(depth);
}
