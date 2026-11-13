/**
 * Checks that the candidate is not a string; narrows a union by removing `string`.
 * Use a positive guard such as `isString` to narrow `unknown`.
 */
export function isNotString<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, string> {
  return typeof candidate !== "string";
}
