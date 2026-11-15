import type { NonEmptyString } from "#types/NonEmptyString";

export function isNonEmptyString<Candidate>(
  candidate: Candidate,
): candidate is Candidate & NonEmptyString<Candidate & string> {
  return typeof candidate === "string" && candidate !== "";
}
