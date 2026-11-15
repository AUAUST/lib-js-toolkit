import type { EmptyString } from "#types/EmptyString";

export function isEmptyString(candidate: unknown): candidate is EmptyString {
  return candidate === "";
}
