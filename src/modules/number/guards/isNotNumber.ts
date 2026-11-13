import { isNumber } from "#modules/number/guards/isNumber";

/**
 * Returns whether the candidate is not a number; never mutates its input.
 */
export function isNotNumber<Candidate>(
  candidate: Candidate,
): candidate is Exclude<Candidate, number> {
  return !isNumber(candidate);
}
