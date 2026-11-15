import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types items as records so `memberValue` accepts any property key; the overloads hold the real contract.

/**
 * Returns the index of the last item of an array the predicate
 * accepts, or `-1` when none does; holes read as `undefined`, as with
 * `Array.prototype.findLastIndex`. The predicate receives each item with its
 * index. A property name instead accepts the last item whose member is truthy,
 * calling it when it is a method; a union item type accepts only a name every
 * member has. A nullish array returns `undefined`.
 *
 * @throws {TypeError} when the predicate is neither a function nor a property key.
 * @native equal Array.prototype.findLastIndex
 */
export function findLastIndex<Items extends readonly unknown[]>(
  array: Items,
  predicate:
    ((value: Items[number], index: number) => unknown) | keyof Items[number],
): number;
export function findLastIndex<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  predicate:
    ((value: Items[number], index: number) => unknown) | keyof Items[number],
): number | undefined;
export function findLastIndex(
  array: Maybe<readonly Record<PropertyKey, unknown>[]>,
  predicate: ((value: unknown, index: number) => unknown) | PropertyKey,
): number | undefined {
  if (array == null) {
    return;
  }

  if (isFunction(predicate)) {
    return array.findLastIndex(predicate);
  }

  if (!isPropertyKey(predicate)) {
    throw new TypeError("Expected a predicate function or a property name.");
  }

  return array.findLastIndex((value) => memberValue(value, predicate));
}
