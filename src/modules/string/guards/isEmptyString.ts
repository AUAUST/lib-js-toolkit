import type { EmptyString } from "#types/EmptyString";

// @debt `EmptyString` also describes whitespace-only literals, while this guard matches only `""`: the predicate's false branch can wrongly exclude whitespace literals.
export function isEmptyString(candidate: unknown): candidate is EmptyString {
  return candidate === "";
}
