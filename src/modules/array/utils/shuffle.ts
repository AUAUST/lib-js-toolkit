import { randomInteger } from "#modules/random/utils/randomInteger";

/**
 * Shuffles an array's items in place with a Fisher–Yates pass drawing from
 * `random.randomInteger`. Returns the same array.
 */
export function shuffle<Item>(array: Item[]): Item[] {
  for (let index = array.length - 1; index > 0; index--) {
    const target = randomInteger(0, index);
    const item = array[index];

    array[index] = array[target];
    array[target] = item;
  }

  return array;
}
