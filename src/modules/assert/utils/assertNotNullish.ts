import { AssertionError } from "#errors/AssertionError";
import { isNotNullish } from "#modules/guard/guards/isNotNullish";

/**
 * Throws an `AssertionError` when the candidate is null or undefined; removes it from the candidate's type in place.
 */
export function assertNotNullish<Candidate>(
  candidate: Candidate,
  message = "Expected a value that is not null or undefined.",
): asserts candidate is Exclude<Candidate, null | undefined> {
  if (!isNotNullish(candidate)) {
    throw new AssertionError(message);
  }
}
