/**
 * Checks that the candidate is neither `null` nor `undefined`; narrows to
 * `NonNullable`, so `unknown` narrows to `{}`.
 */
export function isNotNullish<Candidate>(
  candidate: Candidate,
): candidate is NonNullable<Candidate> {
  return candidate != null;
}
