import { asArray } from "#modules/array/utils/asArray";
import { from } from "#modules/array/utils/from";
import { intersection as intersectionIterable } from "#modules/iterable/utils/intersection";
import type { Maybe } from "#types/Maybe";

/**
 * Copies the items of an array present in `other` into a new array, keeping
 * their order and duplicates; holes read as `undefined`. Any other iterable but
 * a string is copied once first. `other` is a set-like read through its `has`,
 * or an iterable compared by SameValueZero so `NaN` matches `NaN`. A nullish
 * iterable returns `undefined`.
 *
 * @throws {TypeError} when the iterable is a string or is not iterable, or
 * `other` is neither iterable nor set-like.
 */
export function intersection<Items extends readonly unknown[]>(
  iterable: Items,
  other:
    | Iterable<NoInfer<Items[number]>>
    | { has(value: NoInfer<Items[number]>): unknown },
): Items[number][];
export function intersection<Item>(
  iterable: Iterable<Item> & object,
  other: Iterable<NoInfer<Item>> | { has(value: NoInfer<Item>): unknown },
): Item[];
export function intersection<Items extends readonly unknown[]>(
  iterable: Maybe<Items>,
  other:
    | Iterable<NoInfer<Items[number]>>
    | { has(value: NoInfer<Items[number]>): unknown },
): Items[number][] | undefined;
export function intersection<Item>(
  iterable: Maybe<Iterable<Item> & object>,
  other: Iterable<NoInfer<Item>> | { has(value: NoInfer<Item>): unknown },
): Item[] | undefined;
export function intersection(
  iterable: Maybe<Iterable<unknown> & object>,
  other: Iterable<unknown> | { has(value: unknown): unknown },
): unknown[] | undefined {
  if (iterable != null) {
    return from(intersectionIterable(asArray(iterable), other));
  }
}
