import { AssertionError } from "#errors/AssertionError";
import { isPromise } from "#modules/async/guards/isPromise";

/**
 * @throws {AssertionError} unless the candidate is a promise; narrows it in
 * place.
 */
export function assertPromise<Value>(
  candidate: Value | Promise<Value>,
  message = "Expected a promise.",
): asserts candidate is Promise<Value> {
  if (!isPromise(candidate)) {
    throw new AssertionError(message);
  }
}
