import type { FilledString } from "#types/FilledString";

// @debt `FilledString` excludes whitespace-only literals, while this guard accepts them: `isNonEmptyString(" ")` narrows a `" "` literal to `never`.
export function isNonEmptyString(
  candidate: unknown,
): candidate is FilledString {
  return typeof candidate === "string" && candidate !== "";
}
