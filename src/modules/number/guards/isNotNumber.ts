/**
 * Checks that the candidate is not a number; narrows a union by removing `number`.
 * Use a positive guard such as `isString` to narrow `unknown`.
 */
export function isNotNumber<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, number> {
  return typeof candidate !== "number";
}
