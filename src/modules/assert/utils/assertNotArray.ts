import { AssertionError } from "#errors/AssertionError";
import { isNotArray } from "#modules/array/guards/isNotArray";

/**
 * @throws {AssertionError} when the candidate is an array; removes it from the
 * candidate's type in place.
 */
export function assertNotArray<Candidate>(
  candidate: Candidate,
  message = "Expected a value that is not an array.",
): asserts candidate is Exclude<Candidate, readonly unknown[]> {
  if (!isNotArray(candidate)) {
    throw new AssertionError(message);
  }
}
