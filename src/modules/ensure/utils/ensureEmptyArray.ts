import { assertEmptyArray } from "#modules/assert/utils/assertEmptyArray";

/**
 * Returns the candidate when it is an array of length `0`.
 *
 * @throws {AssertionError} when the candidate is not an array of length `0`.
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
