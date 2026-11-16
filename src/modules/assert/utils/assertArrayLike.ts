import { AssertionError } from "#errors/AssertionError";
import { isArrayLike } from "#modules/array/guards/isArrayLike";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";

/**
 * @throws {AssertionError} unless the candidate is an array-like value;
 * narrows it in place.
 */
export function assertArrayLike(
  candidate: unknown,
  message?: string,
): asserts candidate is ArrayLike<unknown> {
  if (!isArrayLike(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected an array-like value", candidate),
    );
  }
}
