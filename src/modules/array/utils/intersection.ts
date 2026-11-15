import { intersection as intersectionIterable } from "#modules/iterable/utils/intersection";
import type { Maybe } from "#types/Maybe";

/**
 * Copies the items of an array present in `other` into a new array, keeping their
 * order and duplicates; holes read as `undefined`. `other` is a set-like read
 * through its `has`, or an iterable compared by SameValueZero so `NaN` matches
 * `NaN`. A nullish array returns `undefined`.
 *
 * @throws {TypeError} when `other` is neither iterable nor set-like.
 */
export function intersection<Items extends readonly unknown[]>(
  array: Items,
  other:
    | Iterable<NoInfer<Items[number]>>
    | { has(value: NoInfer<Items[number]>): unknown },
): Items[number][];
export function intersection<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  other:
    | Iterable<NoInfer<Items[number]>>
    | { has(value: NoInfer<Items[number]>): unknown },
): Items[number][] | undefined;
export function intersection(
  array: Maybe<readonly unknown[]>,
  other: Iterable<unknown> | { has(value: unknown): unknown },
): unknown[] | undefined {
  if (array != null) {
    return Array.from(intersectionIterable(array, other));
  }
}
