import { AssertionError } from "#errors/AssertionError";

/**
 * @throws {AssertionError} unless the candidate is undefined; narrows it in place.
 */
export function assertUndefined(
  candidate: unknown,
  message = "Expected undefined.",
): asserts candidate is undefined {
  if (candidate !== undefined) {
    throw new AssertionError(message);
  }
}
