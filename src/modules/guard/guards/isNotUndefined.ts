/**
 * Checks that the candidate is not `undefined`; narrows a union by removing `undefined`.
 * Use a positive guard such as `isString` to narrow `unknown`.
 */
export function isNotUndefined<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, undefined> {
  return candidate !== undefined;
}
