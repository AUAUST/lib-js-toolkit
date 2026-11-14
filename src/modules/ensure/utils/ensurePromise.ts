import { assertPromise } from "#modules/assert/utils/assertPromise";

/**
 * Returns the candidate when it is a promise; otherwise throws an
 * `AssertionError`.
 */
export function ensurePromise<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Promise<unknown> {
  assertPromise(candidate, message);

  return candidate;
}
