import { randomInteger } from "#modules/random/utils/randomInteger";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the item at a uniformly random position, drawing from
 * `random.randomInteger`. A nullish array returns `undefined`.
 *
 * @throws {RangeError} when the array is empty.
 */
export function random<Items extends readonly unknown[]>(
  array: Items,
): Items[number];
export function random<Items extends readonly unknown[]>(
  array: Maybe<Items>,
): Items[number] | undefined;
export function random(array: Maybe<readonly unknown[]>): unknown {
  if (array == null) {
    return;
  }

  if (array.length === 0) {
    throw new RangeError("Cannot pick an item from an empty array.");
  }

  return array[randomInteger(0, array.length - 1)];
}
