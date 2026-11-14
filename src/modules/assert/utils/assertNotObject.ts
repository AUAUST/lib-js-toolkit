import { AssertionError } from "#errors/AssertionError";
import { isNotObject } from "#modules/object/guards/isNotObject";

/**
 * @throws {AssertionError} when the candidate is an object; removes it from the
 * candidate's type in place.
 */
export function assertNotObject<Candidate>(
  candidate: Candidate,
  message = "Expected a value that is not an object.",
): asserts candidate is Exclude<Candidate, object> {
  if (!isNotObject(candidate)) {
    throw new AssertionError(message);
  }
}
