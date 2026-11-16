import { assertPromise } from "#modules/assert/utils/assertPromise";

/**
 * Returns the candidate when it is a promise.
 *
 * @throws {AssertionError} when the candidate is not a promise.
 */
export function ensurePromise<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Promise<unknown> {
  assertPromise(candidate, message);

  return candidate;
}
