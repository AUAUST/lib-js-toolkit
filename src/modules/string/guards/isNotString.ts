import { isString } from "#modules/string/guards/isString";

/**
 * Checks that the candidate is not a string; narrows a union by removing `string`.
 */
export function isNotString<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, string> {
  return !isString(candidate);
}
