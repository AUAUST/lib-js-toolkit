/**
 * Checks that the candidate is neither `null` nor `undefined`; narrows a union by removing both.
 * Use a positive guard such as `isString` to narrow `unknown`.
 */
export function isNotNullish<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, null | undefined> {
  return candidate != null;
}
