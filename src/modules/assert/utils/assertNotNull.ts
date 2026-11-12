import { AssertionError } from "#errors/AssertionError";
import { isNotNull } from "#modules/guard/guards/isNotNull";

/** Throws an `AssertionError` when the candidate is null; removes it from the candidate's type in place. */
export function assertNotNull<Candidate>(
  candidate: Candidate,
  message = "Expected a value that is not null.",
): asserts candidate is Exclude<Candidate, null> {
  if (!isNotNull(candidate)) {
    throw new AssertionError(message);
  }
}
