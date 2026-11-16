import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isNonEmptyString } from "#modules/string/guards/isNonEmptyString";
import type { NonEmptyString } from "#types/NonEmptyString";

/**
 * @throws {AssertionError} unless the candidate is a string other than `""`;
 * narrows it in place.
 */
export function assertNonEmptyString<Candidate>(
  candidate: Candidate,
  message?: string,
): asserts candidate is Candidate & NonEmptyString<Candidate & string> {
  if (!isNonEmptyString(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a non-empty string", candidate),
    );
  }
}
