import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isEmptyString } from "#modules/string/guards/isEmptyString";
import type { EmptyString } from "#types/EmptyString";

/**
 * @throws {AssertionError} unless the candidate is `""`; narrows it in place.
 */
export function assertEmptyString(
  candidate: unknown,
  message?: string,
): asserts candidate is EmptyString {
  if (!isEmptyString(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected an empty string", candidate),
    );
  }
}
