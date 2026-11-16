import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isNotNull } from "#modules/guard/guards/isNotNull";

/**
 * @throws {AssertionError} when the candidate is null; removes it from the
 * candidate's type in place.
 */
export function assertNotNull<Candidate>(
  candidate: Candidate,
  message?: string,
): asserts candidate is Exclude<Candidate, null> {
  if (!isNotNull(candidate)) {
    throw new AssertionError(
      message ??
        receivedMessage("Expected a value that is not null", candidate),
    );
  }
}
