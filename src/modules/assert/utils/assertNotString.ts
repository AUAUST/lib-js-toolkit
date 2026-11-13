import { AssertionError } from "#errors/AssertionError";
import { isNotString } from "#modules/string/guards/isNotString";

/**
 * Throws an `AssertionError` when the candidate is a string; removes it from the candidate's type in place.
 */
export function assertNotString<Candidate>(
  candidate: Candidate,
  message = "Expected a value that is not a string.",
): asserts candidate is Exclude<Candidate, string> {
  if (!isNotString(candidate)) {
    throw new AssertionError(message);
  }
}
