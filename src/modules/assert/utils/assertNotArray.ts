import { AssertionError } from "#errors/AssertionError";
import { isNotArray } from "#modules/array/guards/isNotArray";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";

/**
 * @throws {AssertionError} when the candidate is an array; removes it from the
 * candidate's type in place.
 */
export function assertNotArray<Candidate>(
  candidate: Candidate,
  message?: string,
): asserts candidate is Exclude<Candidate, readonly unknown[]> {
  if (!isNotArray(candidate)) {
    throw new AssertionError(
      message ??
        receivedMessage("Expected a value that is not an array", candidate),
    );
  }
}
