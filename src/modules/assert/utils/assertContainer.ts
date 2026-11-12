import { AssertionError } from "#errors/AssertionError";
import { isContainer } from "#modules/guard/guards/isContainer";

/** Throws an `AssertionError` unless the candidate is an object or a function; narrows it in place. */
export function assertContainer(
  candidate: unknown,
  message = "Expected an object or a function.",
): asserts candidate is object {
  if (!isContainer(candidate)) {
    throw new AssertionError(message);
  }
}
