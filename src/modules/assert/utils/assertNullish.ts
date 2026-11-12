import { AssertionError } from "#errors/AssertionError";
import { isNullish } from "#modules/guard/guards/isNullish";

/** Throws an `AssertionError` unless the candidate is null or undefined; narrows it in place. */
export function assertNullish(
  candidate: unknown,
  message = "Expected null or undefined.",
): asserts candidate is null | undefined {
  if (!isNullish(candidate)) {
    throw new AssertionError(message);
  }
}
