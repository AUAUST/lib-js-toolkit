import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isFinite } from "#modules/number/guards/isFinite";

/**
 * @throws {AssertionError} unless the candidate is a finite number;
 * narrows it in place.
 */
export function assertFinite(
  candidate: unknown,
  message?: string,
): asserts candidate is number {
  if (!isFinite(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a finite number", candidate),
    );
  }
}
