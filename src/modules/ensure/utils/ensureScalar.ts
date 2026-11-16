import { assertScalar } from "#modules/assert/utils/assertScalar";
import type { TypeNames } from "#types/TypeNames";

/**
 * Returns the candidate when it is a scalar.
 *
 * @throws {AssertionError} when the candidate is not a scalar.
 */
export function ensureScalar<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & TypeNames["scalar"] {
  assertScalar(candidate, message);

  return candidate;
}
