import { isArray } from "#modules/array/guards/isArray";
import { copyIterable } from "#modules/array/internals/copyIterable";

export function readIterable<Item>(
  iterable: Iterable<Item> & object,
): readonly Item[] {
  return isArray(iterable) ? iterable : copyIterable(iterable);
}
