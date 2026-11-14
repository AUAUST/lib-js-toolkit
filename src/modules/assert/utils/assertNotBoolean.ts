import { AssertionError } from "#errors/AssertionError";
import { isNotBoolean } from "#modules/boolean/guards/isNotBoolean";

/**
 * @throws {AssertionError} when the candidate is a boolean; removes it from the
 * candidate's type in place.
 */
export function assertNotBoolean<Candidate>(
  candidate: Candidate,
  message = "Expected a value that is not a boolean.",
): asserts candidate is Exclude<Candidate, boolean> {
  if (!isNotBoolean(candidate)) {
    throw new AssertionError(message);
  }
}
