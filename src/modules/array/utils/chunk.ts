import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import type { Maybe } from "#types/Maybe";

/**
 * Splits the items into new arrays of `size` items; the last one holds the
 * remainder. Never mutates the source. A nullish array returns `undefined`.
 *
 * @throws {RangeError} when the size is not a positive safe integer.
 */
export function chunk<Item>(array: readonly Item[], size: number): Item[][];
export function chunk(array: null | undefined, size: number): undefined;
export function chunk<Item>(
  array: Maybe<readonly Item[]>,
  size: number,
): Item[][] | undefined;
export function chunk<Item>(
  array: Maybe<readonly Item[]>,
  size: number,
): Item[][] | undefined {
  // @debt The positive-integer size check is duplicated across `array.chunk`, `iterable.chunk` and `string.chunk`; a shared guard in the number domain would own it (backlog utils.10).
  if (!isSafeInteger(size) || size < 1) {
    throw new RangeError("A chunk size must be a positive safe integer.");
  }

  if (array == null) {
    return;
  }

  const chunks: Item[][] = [];

  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }

  return chunks;
}
