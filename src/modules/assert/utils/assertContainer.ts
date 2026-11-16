import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isContainer } from "#modules/guard/guards/isContainer";

/**
 * @throws {AssertionError} unless the candidate is an object or a function;
 * narrows it in place.
 */
export function assertContainer(
  candidate: unknown,
  message?: string,
): asserts candidate is object {
  if (!isContainer(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected an object or a function", candidate),
    );
  }
}
