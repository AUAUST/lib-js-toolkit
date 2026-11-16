import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isIterable } from "#modules/iterable/guards/isIterable";

/**
 * @throws {AssertionError} unless the candidate is iterable; narrows it in place.
 */
export function assertIterable(
  candidate: unknown,
  message?: string,
): asserts candidate is Iterable<unknown> {
  if (!isIterable(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected an iterable", candidate),
    );
  }
}
