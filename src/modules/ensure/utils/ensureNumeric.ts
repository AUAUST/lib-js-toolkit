import { assertNumeric } from "#modules/assert/utils/assertNumeric";
import type { TypeNames } from "#types/TypeNames";

/**
 * Returns the candidate when it is a number or bigint.
 *
 * @throws {AssertionError} when the candidate is neither a number nor a bigint.
 */
export function ensureNumeric<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & TypeNames["numeric"] {
  assertNumeric(candidate, message);

  return candidate;
}
