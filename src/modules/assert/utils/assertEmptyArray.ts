import { AssertionError } from "#errors/AssertionError";
import { isEmptyArray } from "#modules/array/guards/isEmptyArray";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";

/**
 * @throws {AssertionError} unless the candidate is an array of length `0`;
 * narrows it in place.
 */
export function assertEmptyArray(
  candidate: unknown[],
  message?: string,
): asserts candidate is [];
export function assertEmptyArray(
  candidate: unknown,
  message?: string,
): asserts candidate is readonly [];
export function assertEmptyArray(candidate: unknown, message?: string): void {
  if (!isEmptyArray(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected an empty array", candidate),
    );
  }
}
