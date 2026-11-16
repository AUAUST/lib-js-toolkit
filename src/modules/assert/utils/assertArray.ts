import { AssertionError } from "#errors/AssertionError";
import { isArray } from "#modules/array/guards/isArray";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";

/**
 * @throws {AssertionError} unless the candidate is an array; narrows it in place.
 */
export function assertArray(
  candidate: unknown,
  message?: string,
): asserts candidate is any[] {
  if (!isArray(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected an array", candidate),
    );
  }
}
