import { assertEmptyString } from "#modules/assert/utils/assertEmptyString";
import type { EmptyString } from "#types/EmptyString";

/**
 * Returns the candidate when it is `""`.
 *
 * @throws {AssertionError} when the candidate is not `""`.
 */
export function ensureEmptyString<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & EmptyString {
  assertEmptyString(candidate, message);

  return candidate;
}
