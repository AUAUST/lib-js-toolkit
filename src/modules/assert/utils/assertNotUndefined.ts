import { AssertionError } from "#errors/AssertionError";
import { isNotUndefined } from "#modules/guard/guards/isNotUndefined";

/**
 * @throws {AssertionError} when the candidate is undefined; removes it from the candidate's type in place.
 */
export function assertNotUndefined<Candidate>(
  candidate: Candidate,
  message = "Expected a value that is not undefined.",
): asserts candidate is Exclude<Candidate, undefined> {
  if (!isNotUndefined(candidate)) {
    throw new AssertionError(message);
  }
}
