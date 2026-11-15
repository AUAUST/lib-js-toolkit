import { assertEmptyArray } from "#modules/assert/utils/assertEmptyArray";

/**
 * Returns the candidate when it is an array of length `0`; otherwise throws
 * an `AssertionError`.
 */
export function ensureEmptyArray(candidate: unknown[], message?: string): [];
export function ensureEmptyArray(
  candidate: unknown,
  message?: string,
): readonly [];
export function ensureEmptyArray(
  candidate: unknown,
  message?: string,
): readonly [] {
  assertEmptyArray(candidate, message);

  return candidate;
}
