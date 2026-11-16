import { readIterable } from "#modules/array/internals/readIterable";
import { min } from "#modules/math/utils/min";
import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import { randomInteger } from "#modules/random/utils/randomInteger";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the items at `count` distinct random positions, in draw order, drawing
 * from `random.randomInteger`. A `count` past the array's length returns every
 * item. Any other iterable but a string is copied once first. A nullish iterable
 * returns `undefined` before `count` is checked.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable.
 * @throws {RangeError} when `count` is negative or not an integer.
 */
export function sample<Items extends readonly unknown[]>(
  iterable: Items,
  count: number,
): Items[number][];
export function sample<Item>(
  iterable: Iterable<Item> & object,
  count: number,
): Item[];
export function sample<Items extends readonly unknown[]>(
  iterable: Maybe<Items>,
  count: number,
): Items[number][] | undefined;
export function sample<Item>(
  iterable: Maybe<Iterable<Item> & object>,
  count: number,
): Item[] | undefined;
export function sample(
  iterable: Maybe<Iterable<unknown> & object>,
  count: number,
): unknown[] | undefined {
  if (iterable == null) {
    return;
  }

  if (!isSafeInteger(count) || count < 0) {
    throw new RangeError("Count must be a non-negative safe integer.");
  }

  const array = readIterable(iterable);
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
