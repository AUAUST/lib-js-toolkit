import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isNotNumber } from "#modules/number/guards/isNotNumber";

/**
 * @throws {AssertionError} when the candidate is a number; removes it from the
 * candidate's type in place.
 */
export function assertNotNumber<Candidate>(
  candidate: Candidate,
  message?: string,
): asserts candidate is Exclude<Candidate, number> {
  if (!isNotNumber(candidate)) {
    throw new AssertionError(
      message ??
        receivedMessage("Expected a value that is not a number", candidate),
    );
  }
}
