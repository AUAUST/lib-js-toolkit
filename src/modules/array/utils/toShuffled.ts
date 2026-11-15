import { shuffle } from "#modules/array/utils/shuffle";
import type { Maybe } from "#types/Maybe";

/**
 * Copies an array's items into a new array in a random order, drawing
 * from `random.randomInteger`. Holes read as `undefined`. A nullish array
 * returns `undefined`.
 */
export function toShuffled<Items extends readonly unknown[]>(
  array: Items,
): Items[number][];
export function toShuffled<Items extends readonly unknown[]>(
  array: Maybe<Items>,
): Items[number][] | undefined;
export function toShuffled(
  array: Maybe<readonly unknown[]>,
): unknown[] | undefined {
  if (array != null) {
    return shuffle(Array.from(array));
  }
}
