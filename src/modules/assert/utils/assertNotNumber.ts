import { AssertionError } from "#errors/AssertionError";
import { isNotNumber } from "#modules/number/guards/isNotNumber";

/**
 * Throws an `AssertionError` when the candidate is a number; removes it from the candidate's type in place.
 */
export function assertNotNumber<Candidate>(
  candidate: Candidate,
  message = "Expected a value that is not a number.",
): asserts candidate is Exclude<Candidate, number> {
  if (!isNotNumber(candidate)) {
    throw new AssertionError(message);
  }
}
