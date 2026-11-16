import { isArray } from "#modules/array/guards/isArray";
import { copyIterable } from "#modules/array/internals/copyIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Maps each item of an array, passing it with its index, and flattens each array
 * result by one level into a new array; other results, iterables included, are
 * kept as items. Any other iterable but a string is copied once first. A nullish
 * iterable returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable, or the
 * mapper is not a function.
 * @native equal Array.prototype.flatMap
 */
export function flatMap<Items extends readonly unknown[], Output>(
  iterable: Items,
  mapper: (value: Items[number], index: number) => Output | readonly Output[],
): Output[];
export function flatMap<Item, Output>(
  iterable: Iterable<Item> & object,
  mapper: (value: Item, index: number) => Output | readonly Output[],
): Output[];
export function flatMap<Items extends readonly unknown[], Output>(
  iterable: Maybe<Items>,
  mapper: (value: Items[number], index: number) => Output | readonly Output[],
): Output[] | undefined;
export function flatMap<Item, Output>(
  iterable: Maybe<Iterable<Item> & object>,
  mapper: (value: Item, index: number) => Output | readonly Output[],
): Output[] | undefined;
export function flatMap(
  iterable: Maybe<Iterable<unknown> & object>,
  mapper: (value: unknown, index: number) => unknown,
): unknown[] | undefined {
  if (iterable == null) {
    return;
  }

  const array = isArray(iterable) ? iterable : copyIterable(iterable);

  return array.flatMap(mapper);
}
