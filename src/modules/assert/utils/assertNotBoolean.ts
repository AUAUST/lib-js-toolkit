import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isNotBoolean } from "#modules/boolean/guards/isNotBoolean";

/**
 * @throws {AssertionError} when the candidate is a boolean; removes it from the
 * candidate's type in place.
 */
export function assertNotBoolean<Candidate>(
  candidate: Candidate,
  message?: string,
): asserts candidate is Exclude<Candidate, boolean> {
  if (!isNotBoolean(candidate)) {
    throw new AssertionError(
      message ??
        receivedMessage("Expected a value that is not a boolean", candidate),
    );
  }
}
