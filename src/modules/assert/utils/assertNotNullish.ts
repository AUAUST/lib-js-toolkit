import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";

/**
 * @throws {AssertionError} when the candidate is null or undefined; removes it
 * from the candidate's type in place.
 */
export function assertNotNullish<Candidate>(
  candidate: Candidate,
  message?: string,
): asserts candidate is NonNullable<Candidate> {
  if (candidate == null) {
    throw new AssertionError(
      message ??
        receivedMessage(
          "Expected a value that is not null or undefined",
          candidate,
        ),
    );
  }
}
