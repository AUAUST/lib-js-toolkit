import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isNotSymbol } from "#modules/guard/guards/isNotSymbol";

/**
 * @throws {AssertionError} when the candidate is a symbol; removes it from the
 * candidate's type in place.
 */
export function assertNotSymbol<Candidate>(
  candidate: Candidate,
  message?: string,
): asserts candidate is Exclude<Candidate, symbol> {
  if (!isNotSymbol(candidate)) {
    throw new AssertionError(
      message ??
        receivedMessage("Expected a value that is not a symbol", candidate),
    );
  }
}
