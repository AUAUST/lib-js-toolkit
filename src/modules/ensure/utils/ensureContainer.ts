import { assertContainer } from "#modules/assert/utils/assertContainer";

/**
 * Returns the candidate when it is an object or a function.
 *
 * @throws {AssertionError} when the candidate is neither an object nor a function.
 */
export function ensureContainer<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & object {
  assertContainer(candidate, message);

  return candidate;
}
