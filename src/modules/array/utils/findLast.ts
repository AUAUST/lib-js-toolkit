import { isFunction } from "#modules/function/guards/isFunction";
import { memberValue } from "#modules/general/utils/memberValue";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import type { BivariantTypeGuard } from "#types/BivariantTypeGuard";
import type { Maybe } from "#types/Maybe";

// @debt The implementation signature types items as records so `memberValue` accepts any property key; the overloads hold the real contract.

/**
 * Returns the last item of an array the predicate accepts, or `undefined` when
 * none does; holes read as `undefined`, as with `Array.prototype.findLast`. The
 * predicate receives each item with its index; a type predicate narrows the
 * result. A property name instead accepts the last item whose member is truthy,
 * calling it when it is a method; a union item type accepts only a name every
 * member has. A nullish array returns `undefined`.
 *
 * @throws {TypeError} when the predicate is neither a function nor a property key.
 * @native equal Array.prototype.findLast
 */
export function findLast<
  Items extends readonly unknown[],
  Output extends Items[number],
>(
  array: Maybe<Items>,
  predicate: (value: NoInfer<Items[number]>, index: number) => value is Output,
): Output | undefined;
export function findLast<Items extends readonly unknown[], Guarded>(
  array: Maybe<Items>,
  predicate: BivariantTypeGuard<Guarded>,
): Extract<Items[number], Guarded> | undefined;
export function findLast<Items extends readonly unknown[]>(
  array: Maybe<Items>,
  predicate:
    ((value: Items[number], index: number) => unknown) | keyof Items[number],
): Items[number] | undefined;
export function findLast(
  array: Maybe<readonly Record<PropertyKey, unknown>[]>,
  predicate: ((value: unknown, index: number) => unknown) | PropertyKey,
): unknown {
  if (array == null) {
    return;
  }

  if (isFunction(predicate)) {
    return array.findLast(predicate);
  }

  if (!isPropertyKey(predicate)) {
    throw new TypeError("Expected a predicate function or a property name.");
  }

  return array.findLast((value) => memberValue(value, predicate));
}
