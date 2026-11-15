import { randomInteger } from "#modules/random/utils/randomInteger";

/**
 * Returns the item at a uniformly random position, drawing from
 * `random.randomInteger`. Throws a `RangeError` on an empty array.
 */
export function random<Items extends readonly unknown[]>(
  array: Items,
): Items[number] {
  if (array.length === 0) {
    throw new RangeError("Cannot pick an item from an empty array.");
  }

  return array[randomInteger(0, array.length - 1)];
}
