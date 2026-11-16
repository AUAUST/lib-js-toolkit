import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isNotObject } from "#modules/object/guards/isNotObject";

/**
 * @throws {AssertionError} when the candidate is an object; removes it from the
 * candidate's type in place.
 */
export function assertNotObject<Candidate>(
  candidate: Candidate,
  message?: string,
): asserts candidate is Exclude<Candidate, object> {
  if (!isNotObject(candidate)) {
    throw new AssertionError(
      message ??
        receivedMessage("Expected a value that is not an object", candidate),
    );
  }
}
