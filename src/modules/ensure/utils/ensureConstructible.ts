import { assertConstructible } from "#modules/assert/utils/assertConstructible";
import type { Constructor } from "#types/Constructor";

/**
 * Returns the candidate when it is a constructor; otherwise throws an
 * `AssertionError`.
 */
export function ensureConstructible<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Constructor {
  assertConstructible(candidate, message);

  return candidate;
}
