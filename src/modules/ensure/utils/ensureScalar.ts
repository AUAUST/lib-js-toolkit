import { assertScalar } from "#modules/assert/utils/assertScalar";
import type { TypeNames } from "#types/TypeNames";

/**
 * Returns the candidate when it is a scalar; otherwise throws an `AssertionError`.
 */
export function ensureScalar<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & TypeNames["scalar"] {
  assertScalar(candidate, message);

  return candidate;
}
