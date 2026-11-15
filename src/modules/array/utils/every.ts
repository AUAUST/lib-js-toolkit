import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import type { BivariantTypeGuard } from "#types/BivariantTypeGuard";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types items as records so `memberValue` accepts any property key; the overloads hold the real contract.
// @debt A nullish-accepting array loses the type-predicate overload, since a type predicate cannot return `undefined`.

/**
 * Tells whether the predicate accepts every item of an array, stopping at the
 * first rejected one and skipping holes, as with `Array.prototype.every`. The
 * predicate receives each item with its index; a type predicate narrows the array.
 * A property name instead accepts the items whose member is truthy, calling it
 * when it is a method; a union item type accepts only a name every member has.
 * An empty array gives `true`; a nullish array returns `undefined`.
 *
 * @throws {TypeError} when the predicate is neither a function nor a property key.
 * @native equal Array.prototype.every
 */
export function every<
  Items extends readonly unknown[],
  Output extends Items[number],
>(
  array: Items,
  predicate: (value: NoInfer<Items[number]>, index: number) => value is Output,
): array is Items & readonly Output[];
export function every<Items extends readonly unknown[], Guarded>(
  array: Items,
  predicate: BivariantTypeGuard<Guarded>,
): array is Items & readonly Extract<Items[number], Guarded>[];
export function every<Items extends readonly unknown[]>(
  array: Items,
  predicate:
    ((value: Items[number], index: number) => unknown) | keyof Items[number],
): boolean;
export function every<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  predicate:
    ((value: Items[number], index: number) => unknown) | keyof Items[number],
): boolean | undefined;
export function every(
  array: Maybe<readonly Record<PropertyKey, unknown>[]>,
  predicate: ((value: unknown, index: number) => unknown) | PropertyKey,
): boolean | undefined {
  if (array == null) {
    return;
  }

  if (isFunction(predicate)) {
    return array.every(predicate);
  }

  if (!isPropertyKey(predicate)) {
    throw new TypeError("Expected a predicate function or a property name.");
  }

  return array.every((value) => memberValue(value, predicate));
}
