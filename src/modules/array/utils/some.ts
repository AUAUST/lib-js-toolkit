import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types items as records so `memberValue` accepts any property key; the overloads hold the real contract.

/**
 * Tells whether the predicate accepts an item of an array, stopping at the first
 * accepted one and skipping holes, as with `Array.prototype.some`. The predicate
 * receives each item with its index. A property name instead accepts an item
 * whose member is truthy, calling it when it is a method; a union item type
 * accepts only a name every member has. An empty array gives `false`; a nullish
 * array returns `undefined`.
 *
 * @throws {TypeError} when the predicate is neither a function nor a property
 * key.
 * @native equal Array.prototype.some
 */
export function some<Items extends readonly unknown[]>(
  array: Items,
  predicate:
    ((value: Items[number], index: number) => unknown) | keyof Items[number],
): boolean;
export function some<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  predicate:
    ((value: Items[number], index: number) => unknown) | keyof Items[number],
): boolean | undefined;
export function some(
  array: Maybe<readonly Record<PropertyKey, unknown>[]>,
  predicate: ((value: unknown, index: number) => unknown) | PropertyKey,
): boolean | undefined {
  if (array == null) {
    return;
  }

  if (isFunction(predicate)) {
    return array.some(predicate);
  }

  if (!isPropertyKey(predicate)) {
    throw new TypeError("Expected a predicate function or a property name.");
  }

  return array.some((value) => memberValue(value, predicate));
}
