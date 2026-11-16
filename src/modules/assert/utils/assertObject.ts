import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isObject } from "#modules/object/guards/isObject";

/**
 * @throws {AssertionError} unless the candidate is an object; narrows it in place.
 */
export function assertObject(
  candidate: unknown,
  message?: string,
): asserts candidate is object {
  if (!isObject(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected an object", candidate),
    );
  }
}
