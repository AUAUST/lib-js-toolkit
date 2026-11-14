import { assertNullish } from "#modules/assert/utils/assertNullish";

/**
 * Returns the candidate when it is null or undefined; otherwise throws an
 * `AssertionError`.
 */
export function ensureNullish<Candidate>(
  candidate: Candidate,
  message?: string,
): (Candidate & null) | undefined {
  assertNullish(candidate, message);

  return candidate;
}
