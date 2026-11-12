/**
 * Checks that the candidate is not a function; narrows a union by removing function types.
 * Use a positive guard such as `isString` to narrow `unknown`.
 */
export function isNotFunction<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, (...args: any[]) => any> {
  return typeof candidate !== "function";
}
