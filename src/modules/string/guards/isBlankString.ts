import type { BlankString } from "#types/BlankString";

/**
 * Matches a string whose `trim()` is `""`.
 */
export function isBlankString(candidate: unknown): candidate is BlankString {
  return typeof candidate === "string" && candidate.trim() === "";
}
