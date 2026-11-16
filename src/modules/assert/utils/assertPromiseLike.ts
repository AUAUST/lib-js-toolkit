import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isPromiseLike } from "#modules/async/guards/isPromiseLike";

/**
 * @throws {AssertionError} unless the candidate is a promise-like value;
 * narrows it in place.
 */
export function assertPromiseLike<Value>(
  candidate: Value | PromiseLike<Value>,
  message?: string,
): asserts candidate is PromiseLike<Value> {
  if (!isPromiseLike(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a promise-like value", candidate),
    );
  }
}
