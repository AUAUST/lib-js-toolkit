import { AssertionError } from "#errors/AssertionError";
import { isBoolean } from "#modules/boolean/guards/isBoolean";

/** Throws an `AssertionError` unless the candidate is a boolean; narrows it in place. */
export function assertBoolean(
  candidate: unknown,
  message = "Expected a boolean.",
): asserts candidate is boolean {
  if (!isBoolean(candidate)) {
    throw new AssertionError(message);
  }
}
