import { AssertionError } from "#errors/AssertionError";
import { isNonEmptyArray } from "#modules/array/guards/isNonEmptyArray";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";

/**
 * @throws {AssertionError} unless the candidate is an array holding at least one
 * slot; narrows it in place.
 */
export function assertNonEmptyArray<Item>(
  candidate: Item[],
  message?: string,
): asserts candidate is [Item, ...Item[]];
export function assertNonEmptyArray<Item>(
  candidate: readonly Item[],
  message?: string,
): asserts candidate is readonly [Item, ...Item[]];
export function assertNonEmptyArray(
  candidate: unknown,
  message?: string,
): asserts candidate is readonly [unknown, ...unknown[]];
export function assertNonEmptyArray(
  candidate: unknown,
  message?: string,
): void {
  if (!isNonEmptyArray(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a non-empty array", candidate),
    );
  }
}
