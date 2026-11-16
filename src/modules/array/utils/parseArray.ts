import { isArray } from "#modules/array/guards/isArray";
import { isArrayLike } from "#modules/array/guards/isArrayLike";
import { from } from "#modules/array/utils/from";
import { isIterable } from "#modules/iterable/guards/isIterable";
import { isObject } from "#modules/object/guards/isObject";

/**
 * Parses input to an array without mutation, or `undefined` when it is neither
 * an array, an iterable object nor an array-like.
 */
export function parseArray<Input extends readonly unknown[]>(
  input: Input,
): Input;
export function parseArray(input: null | undefined): undefined;
export function parseArray<Value>(input: Iterable<Value> & object): Value[];
export function parseArray(input: unknown): unknown[] | undefined;
export function parseArray(input: unknown): readonly unknown[] | undefined {
  if (isArray(input)) {
    return input;
  }

  if (!isObject(input)) {
    return;
  }

  if (isIterable(input)) {
    return from(input);
  }

  return isArrayLike(input) ? from(input) : undefined;
}
