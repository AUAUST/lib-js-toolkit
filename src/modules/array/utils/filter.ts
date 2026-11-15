import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import type { BivariantTypeGuard } from "#types/BivariantTypeGuard";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types items as records so `memberValue` accepts any property key; the overloads hold the real contract.

/**
 * Keeps the items of an array the predicate accepts, in a new array; the predicate
 * receives each item with its index, and a type predicate narrows the result.
 * A property name instead keeps the items whose member is truthy, calling it
 * when it is a method; a union item type accepts only a name every member has.
 * A nullish array returns `undefined`.
 *
 * @throws {TypeError} when the predicate is neither a function nor a property key.
 * @native equal Array.prototype.filter
 */
export function filter<
  Items extends readonly unknown[],
  Output extends Items[number],
>(
  array: Items,
  predicate: (value: NoInfer<Items[number]>, index: number) => value is Output,
): Output[];
export function filter<Items extends readonly unknown[], Guarded>(
  array: Items,
  predicate: BivariantTypeGuard<Guarded>,
): Extract<Items[number], Guarded>[];
export function filter<Items extends readonly unknown[]>(
  array: Items,
  predicate:
    ((value: Items[number], index: number) => unknown) | keyof Items[number],
): Items[number][];
export function filter<
  Items extends readonly unknown[],
  Output extends Items[number],
>(
  array: Maybe<Items>,
  predicate: (value: NoInfer<Items[number]>, index: number) => value is Output,
): Output[] | undefined;
export function filter<Items extends readonly unknown[], Guarded>(
  array: Maybe<Items>,
  predicate: BivariantTypeGuard<Guarded>,
): Extract<Items[number], Guarded>[] | undefined;
export function filter<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  predicate:
    ((value: Items[number], index: number) => unknown) | keyof Items[number],
): Items[number][] | undefined;
export function filter(
  array: Maybe<readonly Record<PropertyKey, unknown>[]>,
  predicate: ((value: unknown, index: number) => unknown) | PropertyKey,
): unknown[] | undefined {
  if (array == null) {
    return;
  }

  if (isFunction(predicate)) {
    return array.filter(predicate);
  }

  if (!isPropertyKey(predicate)) {
    throw new TypeError("Expected a predicate function or a property name.");
  }

  return array.filter((value) => memberValue(value, predicate));
}
