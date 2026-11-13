/**
 * Checks that the candidate is not a string; narrows a union by removing `string`.
 */
export function isNotString<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, string> {
  return typeof candidate !== "string";
}
