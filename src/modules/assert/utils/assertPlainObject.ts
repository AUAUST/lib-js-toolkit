import { AssertionError } from "#errors/AssertionError";
import { isPlainObject } from "#modules/object/guards/isPlainObject";

/**
 * Throws an `AssertionError` unless the candidate is a plain object; narrows it in place.
 */
export function assertPlainObject(
  candidate: unknown,
  message = "Expected a plain object.",
): asserts candidate is Record<string, unknown> {
  if (!isPlainObject(candidate)) {
    throw new AssertionError(message);
  }
}
