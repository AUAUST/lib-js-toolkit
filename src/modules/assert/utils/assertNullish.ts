import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";

/**
 * @throws {AssertionError} unless the candidate is null or undefined;
 * narrows it in place.
 */
export function assertNullish(
  candidate: unknown,
  message?: string,
): asserts candidate is null | undefined {
  if (candidate != null) {
    throw new AssertionError(
      message ?? receivedMessage("Expected null or undefined", candidate),
    );
  }
}
