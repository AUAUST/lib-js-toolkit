/**
 * Checks that the candidate is not a symbol; narrows a union by removing `symbol`.
 * Use a positive guard such as `isString` to narrow `unknown`.
 */
export function isNotSymbol<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, symbol> {
  return typeof candidate !== "symbol";
}
