import { assertPromiseLike } from "#modules/assert/utils/assertPromiseLike";

/**
 * Returns the candidate when it is a promise-like value.
 *
 * @throws {AssertionError} when the candidate is not a promise-like value.
 */
export function ensurePromiseLike<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & PromiseLike<unknown> {
  assertPromiseLike(candidate, message);

  return candidate;
}
