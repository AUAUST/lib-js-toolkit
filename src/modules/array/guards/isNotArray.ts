import { isArray } from "#modules/array/guards/isArray";

/**
 * Checks that the candidate is not an array; narrows a union by removing mutable and readonly arrays and tuples.
 * Use a positive guard such as `isString` to narrow `unknown`.
 */
export function isNotArray<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, readonly unknown[]> {
  return !isArray(candidate);
}
