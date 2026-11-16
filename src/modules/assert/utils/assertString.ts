import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isString } from "#modules/string/guards/isString";

/**
 * @throws {AssertionError} unless the candidate is a string; narrows it in place.
 */
export function assertString(
  candidate: unknown,
  message?: string,
): asserts candidate is string {
  if (!isString(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a string", candidate),
    );
  }
}
