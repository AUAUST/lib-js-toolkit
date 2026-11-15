import { shuffle } from "#modules/array/utils/shuffle";

/**
 * Copies an array's items into a new array in a random order, drawing from
 * `random.randomInteger`. Holes read as `undefined`.
 */
export function toShuffled<Items extends readonly unknown[]>(
  array: Items,
): Items[number][] {
  return shuffle(Array.from(array));
}
