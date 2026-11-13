import { AssertionError } from "#errors/AssertionError";
import type { Guard } from "#modules/ensure/internals/Guard";

/**
 * Returns the candidate when the guard fails; otherwise throws an `AssertionError`.
 */
export function not<Candidate, Guarded>(
  guard: Guard<Guarded>,
  candidate: Candidate,
  message = "Expected the guard to fail.",
): Exclude<Candidate, Guarded> {
  if (guard(candidate)) {
    throw new AssertionError(message);
  }

  // @debt A guard's `false` branch does not narrow a generic `Candidate` to `Exclude<Candidate, Guarded>`, hence the cast.
  return candidate as Exclude<Candidate, Guarded>;
}
