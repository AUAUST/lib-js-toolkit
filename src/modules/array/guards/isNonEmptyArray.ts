import { isArray } from "#modules/array/guards/isArray";

/**
 * Tells whether the candidate is an array holding at least one slot; narrows it
 * to a tuple with a first item, keeping its mutability.
 */
export function isNonEmptyArray<Item>(
  candidate: Item[],
): candidate is [Item, ...Item[]];
export function isNonEmptyArray<Item>(
  candidate: readonly Item[],
): candidate is readonly [Item, ...Item[]];
export function isNonEmptyArray(
  candidate: unknown,
): candidate is readonly [unknown, ...unknown[]];
export function isNonEmptyArray(candidate: unknown): boolean {
  return isArray(candidate) && candidate.length > 0;
}
