import { assertNumeric } from "#modules/assert/utils/assertNumeric";
import type { TypeNames } from "#types/TypeNames";

/**
 * Returns the candidate when it is a number or bigint; otherwise throws
 * an `AssertionError`.
 */
export function ensureNumeric<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & TypeNames["numeric"] {
  assertNumeric(candidate, message);

  return candidate;
}
