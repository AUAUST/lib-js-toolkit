import { copyIterable } from "#modules/array/internals/copyIterable";
import { shuffle } from "#modules/array/utils/shuffle";
import type { Maybe } from "#types/Maybe";

/**
 * Copies any iterable but a string once into a new array in a random order,
 * drawing from `random.randomInteger`. Holes read as `undefined`. A nullish
 * iterable returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable.
 */
export function toShuffled<Items extends readonly unknown[]>(
  iterable: Items,
): Items[number][];
export function toShuffled<Item>(iterable: Iterable<Item> & object): Item[];
export function toShuffled<Items extends readonly unknown[]>(
  iterable: Maybe<Items>,
): Items[number][] | undefined;
export function toShuffled<Item>(
  iterable: Maybe<Iterable<Item> & object>,
): Item[] | undefined;
export function toShuffled(
  iterable: Maybe<Iterable<unknown> & object>,
): unknown[] | undefined {
  if (iterable != null) {
    return shuffle(copyIterable(iterable));
  }
}
