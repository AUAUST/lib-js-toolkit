import { isArray } from "#modules/array/guards/isArray";
import { isIterable } from "#modules/iterable/guards/isIterable";
import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
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
    return Array.from(input);
  }

  // @debt Array-like detection casts instead of narrowing; replace with an array-like guard.
  const { length } = input as { length?: unknown };

  return isSafeInteger(length) && length >= 0
    ? Array.from(input as ArrayLike<unknown>)
    : undefined;
}
