import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isNaN } from "#modules/number/guards/isNaN";

/**
 * @throws {AssertionError} unless the candidate is NaN; narrows it in place.
 */
export function assertNaN(
  candidate: unknown,
  message?: string,
): asserts candidate is number {
  if (!isNaN(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected NaN", candidate),
    );
  }
}
