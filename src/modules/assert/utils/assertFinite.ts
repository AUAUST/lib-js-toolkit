import { AssertionError } from "#errors/AssertionError";
import { isFinite } from "#modules/number/guards/isFinite";

/** Throws an `AssertionError` unless the candidate is a finite number; narrows it in place. */
export function assertFinite(
  candidate: unknown,
  message = "Expected a finite number.",
): asserts candidate is number {
  if (!isFinite(candidate)) {
    throw new AssertionError(message);
  }
}
