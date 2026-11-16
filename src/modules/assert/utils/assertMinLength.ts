import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import type { MinLengthTuple } from "#types/MinLengthTuple";

/**
 * @throws {AssertionError} unless the array holds at least `length` elements;
 * narrows it in place to a tuple of at least that many. Element types
 * are never checked.
 */
export function assertMinLength<Item, Length extends number>(
  array: Item[],
  length: Length,
  message?: string,
): asserts array is MinLengthTuple<Item, Length>;
export function assertMinLength<Item, Length extends number>(
  array: readonly Item[],
  length: Length,
  message?: string,
  // @debt Extract only makes TS accept the generic readonly predicate as assignable to its parameter.
): asserts array is Extract<
  Readonly<MinLengthTuple<Item, Length>>,
  readonly Item[]
>;
export function assertMinLength(
  array: readonly unknown[],
  length: number,
  message?: string,
): void {
  if (array.length < length) {
    throw new AssertionError(
      message ?? receivedMessage(`Expected at least ${length} elements`, array),
    );
  }
}
