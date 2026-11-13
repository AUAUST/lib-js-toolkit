import { isBoolean } from "#modules/boolean/guards/isBoolean";

/**
 * Checks that the candidate is not a boolean; narrows a union by removing `boolean`.
 */
export function isNotBoolean<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, boolean> {
  return !isBoolean(candidate);
}
