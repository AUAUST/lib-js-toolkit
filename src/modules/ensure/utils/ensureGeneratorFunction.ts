import { assertGeneratorFunction } from "#modules/assert/utils/assertGeneratorFunction";
import type { Fn } from "#types/Fn";

/**
 * Returns the candidate when it is a generator function; otherwise throws
 * an `AssertionError`.
 */
export function ensureGeneratorFunction<Candidate>(
  candidate: Candidate,
  message?: string,
): Candidate & Fn<Generator> {
  assertGeneratorFunction(candidate, message);

  return candidate;
}
