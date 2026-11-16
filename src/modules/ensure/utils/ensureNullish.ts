import { assertNullish } from "#modules/assert/utils/assertNullish";

/**
 * Returns the candidate when it is null or undefined.
 *
 * @throws {AssertionError} when the candidate is neither null nor undefined.
 */
export function ensureNullish<Candidate>(
  candidate: Candidate,
  message?: string,
): (Candidate & null) | undefined {
  assertNullish(candidate, message);

  return candidate;
}
