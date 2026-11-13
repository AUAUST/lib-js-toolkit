import { isArray } from "#modules/array/guards/isArray";

/**
 * Checks that the candidate is not an array; narrows a union by removing mutable and readonly arrays and tuples.
 */
export function isNotArray<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, readonly unknown[]> {
  return !isArray(candidate);
}
