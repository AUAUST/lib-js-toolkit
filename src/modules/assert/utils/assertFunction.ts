import { AssertionError } from "#errors/AssertionError";
import { isFunction } from "#modules/function/guards/isFunction";

/**
 * @throws {AssertionError} unless the candidate is a function; narrows it in
 * place.
 */
export function assertFunction(
  candidate: unknown,
  message = "Expected a function.",
): asserts candidate is (...args: unknown[]) => unknown {
  if (!isFunction(candidate)) {
    throw new AssertionError(message);
  }
}
