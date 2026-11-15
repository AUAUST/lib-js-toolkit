import { randomInteger } from "#modules/random/utils/randomInteger";
import type { Maybe } from "#types/Maybe";

/**
 * Shuffles an array's items in place with a Fisher–Yates pass drawing
 * from `random.randomInteger`. Returns the same array. A nullish array
 * returns `undefined`.
 */
export function shuffle<Item>(array: Item[]): Item[];
export function shuffle<Item>(array: Maybe<Item[]>): Item[] | undefined;
export function shuffle(array: Maybe<unknown[]>): unknown[] | undefined {
  if (array == null) {
    return;
  }

  for (let index = array.length - 1; index > 0; index--) {
    const target = randomInteger(0, index);
    const item = array[index];

    array[index] = array[target];
    array[target] = item;
  }

  return array;
}
