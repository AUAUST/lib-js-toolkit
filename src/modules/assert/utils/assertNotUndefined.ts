import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isNotUndefined } from "#modules/guard/guards/isNotUndefined";

/**
 * @throws {AssertionError} when the candidate is undefined; removes it from the
 * candidate's type in place.
 */
export function assertNotUndefined<Candidate>(
  candidate: Candidate,
  message?: string,
): asserts candidate is Exclude<Candidate, undefined> {
  if (!isNotUndefined(candidate)) {
    throw new AssertionError(
      message ??
        receivedMessage("Expected a value that is not undefined", candidate),
    );
  }
}
