import { min } from "#modules/math/utils/min";
import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import { randomInteger } from "#modules/random/utils/randomInteger";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the items at `count` distinct random positions, in draw order, drawing
 * from `random.randomInteger`. A `count` past the array's length returns every
 * item. A nullish array returns `undefined` before `count` is checked.
 *
 * @throws {RangeError} when `count` is negative or not an integer.
 */
export function sample<Items extends readonly unknown[]>(
  array: Items,
  count: number,
): Items[number][];
export function sample<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  count: number,
): Items[number][] | undefined;
export function sample(
  array: Maybe<readonly unknown[]>,
  count: number,
): unknown[] | undefined {
  if (array == null) {
    return;
  }

  if (!isSafeInteger(count) || count < 0) {
    throw new RangeError("Count must be a non-negative safe integer.");
  }

  const positions = Array.from(array.keys());
  const size = min(count, positions.length);
  const result: unknown[] = [];

  for (let index = 0; index < size; index++) {
    const target = randomInteger(index, positions.length - 1);
    const position = positions[target];

    positions[target] = positions[index];
    result.push(array[position]);
  }

  return result;
}
