import { assertNonEmptyArray } from "#modules/assert/utils/assertNonEmptyArray";

/**
 * Returns the candidate when it is an array holding at least one slot; otherwise
 * throws an `AssertionError`.
 */
export function ensureNonEmptyArray<Item>(
  candidate: Item[],
  message?: string,
): [Item, ...Item[]];
export function ensureNonEmptyArray<Item>(
  candidate: readonly Item[],
  message?: string,
): readonly [Item, ...Item[]];
export function ensureNonEmptyArray(
  candidate: unknown,
  message?: string,
): readonly [unknown, ...unknown[]];
export function ensureNonEmptyArray(
  candidate: unknown,
  message?: string,
): readonly [unknown, ...unknown[]] {
  assertNonEmptyArray(candidate, message);

  return candidate;
}
