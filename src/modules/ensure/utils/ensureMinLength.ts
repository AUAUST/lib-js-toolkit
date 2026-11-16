import { assertMinLength } from "#modules/assert/utils/assertMinLength";
import type { MinLengthTuple } from "#types/MinLengthTuple";

/**
 * Returns the array, typed as a tuple of at least `length` elements, when it
 * holds that many. Element types are never checked.
 *
 * @throws {AssertionError} when the array holds fewer than `length` elements.
 */
export function ensureMinLength<Item, Length extends number>(
  array: Item[],
  length: Length,
  message?: string,
): MinLengthTuple<Item, Length>;
export function ensureMinLength<Item, Length extends number>(
  array: readonly Item[],
  length: Length,
  message?: string,
): Readonly<MinLengthTuple<Item, Length>>;
export function ensureMinLength(
  array: readonly unknown[],
  length: number,
  message?: string,
): readonly unknown[] {
  assertMinLength(array, length, message);

  return array;
}
