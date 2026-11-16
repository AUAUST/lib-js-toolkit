import { assertGeneratorFunction } from "#modules/assert/utils/assertGeneratorFunction";
import type { Fn } from "#types/Fn";

/**
 * Returns the candidate when it is a generator function.
 *
 * @throws {AssertionError} when the candidate is not a generator function.
 */
export function ensureGeneratorFunction<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Fn<Generator> {
  assertGeneratorFunction(candidate, message);

  return candidate;
}
