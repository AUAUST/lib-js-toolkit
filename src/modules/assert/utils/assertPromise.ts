import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isPromise } from "#modules/async/guards/isPromise";

/**
 * @throws {AssertionError} unless the candidate is a promise; narrows it in place.
 */
export function assertPromise<Value>(
  candidate: Value | Promise<Value>,
  message?: string,
): asserts candidate is Promise<Value> {
  if (!isPromise(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a promise", candidate),
    );
  }
}
