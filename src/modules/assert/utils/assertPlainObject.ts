import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isPlainObject } from "#modules/object/guards/isPlainObject";

/**
 * @throws {AssertionError} unless the candidate is a plain object;
 * narrows it in place.
 */
export function assertPlainObject(
  candidate: unknown,
  message?: string,
): asserts candidate is Record<string, unknown> {
  if (!isPlainObject(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a plain object", candidate),
    );
  }
}
