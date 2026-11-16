import { isArray } from "#modules/array/guards/isArray";
import { isFunction } from "#modules/function/guards/isFunction";
import { callMethod } from "#modules/function/utils/callMethod";
import { isPropertyKey } from "#modules/guard/guards/isPropertyKey";
import type { Maybe } from "#types/Maybe";
import type { MethodName } from "#types/MethodName";
import type { MethodParameters } from "#types/MethodParameters";
import type { MethodReturnType } from "#types/MethodReturnType";

// @debt `MethodHolder` and the mapper dispatch duplicate `map`; share them through array `internals/`.
// @debt The implementation signature types items as method holders so `callMethod` accepts any property key; the overloads hold the real contract.
type MethodHolder = Record<
  PropertyKey,
  (...args: readonly unknown[]) => unknown
>;

/**
 * Maps each item of an array in place, passing it with its index, and returns
 * the same array; holes stay holes, as with `Array.prototype.map`. A method name
 * instead calls that method on each item with the given arguments; a union item
 * type accepts only a name every member has. A nullish array returns `undefined`.
 *
 * @throws {TypeError} when the array is neither nullish nor an array.
 * @throws {TypeError} when the mapper is neither a function nor a property key.
 */
export function transform<Items extends unknown[], Output>(
  array: Items,
  mapper: (value: Items[number], index: number) => Output,
): { [Index in keyof Items]: Output };
export function transform<
  Items extends unknown[],
  const Name extends MethodName<Items[number]>,
>(
  array: Items,
  method: Name,
  ...args: MethodParameters<Items[number], Name>
): { [Index in keyof Items]: MethodReturnType<Items[number], Name> };
export function transform<Items extends unknown[], Output>(
  array: Maybe<Items>,
  mapper: (value: Items[number], index: number) => Output,
): { [Index in keyof Items]: Output } | undefined;
export function transform<
  Items extends unknown[],
  const Name extends MethodName<Items[number]>,
>(
  array: Maybe<Items>,
  method: Name,
  ...args: MethodParameters<Items[number], Name>
):
  { [Index in keyof Items]: MethodReturnType<Items[number], Name> } | undefined;
export function transform(
  array: Maybe<MethodHolder[]>,
  mapper: ((value: unknown, index: number) => unknown) | PropertyKey,
  ...args: readonly unknown[]
): unknown[] | undefined {
  if (array == null) {
    return;
  }

  if (!isArray(array)) {
    throw new TypeError("Expected an array.");
  }

  if (!isFunction(mapper) && !isPropertyKey(mapper)) {
    throw new TypeError("Expected a mapper function or a method name.");
  }

  const output: unknown[] = array;

  for (let index = 0; index < array.length; index++) {
    if (!(index in array)) {
      continue;
    }

    output[index] = isFunction(mapper)
      ? mapper(array[index], index)
      : callMethod(array[index], mapper, ...args);
  }

  return output;
}
