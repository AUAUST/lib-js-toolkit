/**
 * Checks that the candidate is not `null`; narrows a union by removing `null`.
 * Use a positive guard such as `isString` to narrow `unknown`.
 */
export function isNotNull<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, null> {
  return candidate !== null;
}
