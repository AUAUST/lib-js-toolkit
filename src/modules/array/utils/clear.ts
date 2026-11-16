import { isArray } from "#modules/array/guards/isArray";
import type { Maybe } from "#types/Maybe";

/**
 * Empties an array in place by setting its `length` to `0`, and returns it. A
 * nullish array returns `undefined`.
 *
 * @throws {TypeError} when the array is neither nullish nor an array.
 */
export function clear<Items extends unknown[]>(array: Items): Items;
export function clear(array: null | undefined): undefined;
export function clear<Items extends unknown[]>(
  array: Maybe<Items>,
): Items | undefined;
export function clear(array: Maybe<unknown[]>): unknown[] | undefined {
  if (array == null) {
    return;
  }

  if (!isArray(array)) {
    throw new TypeError("Expected an array.");
  }

  array.length = 0;

  return array;
}
