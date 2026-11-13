import { isArray } from "#modules/array/guards/isArray";
import { isFunction } from "#modules/function/guards/isFunction";
import { isString } from "#modules/string/guards/isString";

/**
 * Converts input to an array without mutation; an array input is returned as is, not copied.
 *
 * @shorthand a
 */
export function toArray<Input extends readonly unknown[]>(input: Input): Input;
export function toArray(input: null | undefined): [];
export function toArray<Value>(input: Iterable<Value> & object): Value[];
export function toArray<Input>(input: Input): Input[];
export function toArray(input: unknown): readonly unknown[] {
  if (input == null) {
    return [];
  }

  if (isArray(input)) {
    return input;
  }

  // @debt Iterable detection casts instead of narrowing; replace with `isIterable` (#170).
  if (!isString(input) && isFunction(input, Symbol.iterator)) {
    return Array.from(input as Iterable<unknown>);
  }

  return [input];
}
