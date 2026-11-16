import { assertPlainObject } from "#modules/assert/utils/assertPlainObject";

/**
 * Returns the candidate when it is a plain object.
 *
 * @throws {AssertionError} when the candidate is not a plain object.
 */
export function ensurePlainObject<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Record<string, unknown> {
  assertPlainObject(candidate, message);

  return candidate;
}
