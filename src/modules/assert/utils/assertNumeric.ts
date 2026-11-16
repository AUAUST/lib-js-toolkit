import { AssertionError } from "#errors/AssertionError";
import { receivedMessage } from "#modules/assert/internals/receivedMessage";
import { isNumeric } from "#modules/guard/guards/isNumeric";
import type { TypeNames } from "#types/TypeNames";

/**
 * @throws {AssertionError} unless the candidate is a number or bigint;
 * narrows it in place.
 */
export function assertNumeric(
  candidate: unknown,
  message?: string,
): asserts candidate is TypeNames["numeric"] {
  if (!isNumeric(candidate)) {
    throw new AssertionError(
      message ?? receivedMessage("Expected a number or bigint", candidate),
    );
  }
}
