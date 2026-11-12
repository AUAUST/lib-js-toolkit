import { assertPromiseLike } from "#modules/assert/utils/assertPromiseLike";

/** Returns the candidate when it is a promise-like value; otherwise throws an `AssertionError`. */
export function ensurePromiseLike<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & PromiseLike<unknown> {
  assertPromiseLike(candidate, message);

  return candidate;
}
