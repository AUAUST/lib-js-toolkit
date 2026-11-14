/**
 * Checks that the candidate is not a boolean; narrows a union by removing
 * `boolean`. Use a positive guard such as `isString` to narrow `unknown`.
 */
export function isNotBoolean<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, boolean> {
  return typeof candidate !== "boolean";
}
