import { AssertionError } from "#errors/AssertionError";
import { isObject } from "#modules/object/guards/isObject";

/**
 * Throws an `AssertionError` unless the candidate is an object; narrows it in place.
 */
export function assertObject(
  candidate: unknown,
  message = "Expected an object.",
): asserts candidate is object {
  if (!isObject(candidate)) {
    throw new AssertionError(message);
  }
}
