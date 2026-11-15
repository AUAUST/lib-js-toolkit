import { isArray } from "#modules/array/guards/isArray";

/**
 * Tells whether the candidate is an array of length `0`; narrows it to an empty
 * tuple, keeping its mutability.
 */
export function isEmptyArray(candidate: unknown[]): candidate is [];
export function isEmptyArray(candidate: unknown): candidate is readonly [];
export function isEmptyArray(candidate: unknown): boolean {
  return isArray(candidate) && candidate.length === 0;
}
