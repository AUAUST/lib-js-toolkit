import { overlaps as overlapsIterable } from "#modules/iterable/utils/overlaps";
import type { Maybe } from "#types/Maybe";

/**
 * Tells whether any item of an array is among `candidates`, stopping at the
 * first match. `candidates` is a set-like read through its `has`, or an
 * iterable compared by SameValueZero so `NaN` matches `NaN`. A nullish array
 * returns `undefined`.
 *
 * @throws {TypeError} when `candidates` is neither iterable nor set-like.
 */
export function overlaps<Items extends readonly unknown[]>(
  array: Items,
  candidates:
    | Iterable<NoInfer<Items[number]>>
    | { has(value: NoInfer<Items[number]>): unknown },
): boolean;
export function overlaps<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  candidates:
    | Iterable<NoInfer<Items[number]>>
    | { has(value: NoInfer<Items[number]>): unknown },
): boolean | undefined;
export function overlaps(
  array: Maybe<readonly unknown[]>,
  candidates: Iterable<unknown> | { has(value: unknown): unknown },
): boolean | undefined {
  return overlapsIterable(array, candidates);
}
