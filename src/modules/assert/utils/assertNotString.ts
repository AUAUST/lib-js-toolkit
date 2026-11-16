import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isNotString } from "#modules/string/guards/isNotString";

/**
 * @throws {AssertionError} when the candidate is a string; removes it from the
 * candidate's type in place.
 */
export function assertNotString<Candidate>(
  candidate: Candidate,
  message?: string,
): asserts candidate is Exclude<Candidate, string> {
  if (!isNotString(candidate)) {
    throw new AssertionError(
      message ??
        receivedMessage("Expected a value that is not a string", candidate),
    );
  }
}
