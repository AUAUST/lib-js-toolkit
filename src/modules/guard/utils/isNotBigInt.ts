/**
 * Checks that the candidate is not a bigint; narrows a union by removing `bigint`.
 * Use a positive guard such as `isString` to narrow `unknown`.
 */
export function isNotBigInt<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, bigint> {
  return typeof candidate !== "bigint";
}
