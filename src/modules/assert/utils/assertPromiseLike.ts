import { AssertionError } from "#errors/AssertionError";
import { isPromiseLike } from "#modules/async/guards/isPromiseLike";

/** Throws an `AssertionError` unless the candidate is a promise-like value; narrows it in place. */
export function assertPromiseLike<Value>(
  candidate: Value | PromiseLike<Value>,
  message = "Expected a promise-like value.",
): asserts candidate is PromiseLike<Value> {
  if (!isPromiseLike(candidate)) {
    throw new AssertionError(message);
  }
}
