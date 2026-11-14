import { isArray } from "#modules/array/guards/isArray";
import { isIterable } from "#modules/iterable/guards/isIterable";
import { isString } from "#modules/string/guards/isString";

/**
 * The array `toArray` returns for `Input`, per union member: arrays as is,
 * nullish as `[]`, non-string iterable objects as arrays of their elements, and
 * the remaining members wrapped together in one array.
 */
export type ToArrayResult<Input> =
  | Extract<Input, readonly unknown[]>
  | (Input extends readonly unknown[]
      ? never
      : Input extends null | undefined
        ? []
        : Input extends string
          ? never
          : Input extends Iterable<infer Value> & object
            ? Value[]
            : never)
  | (Exclude<
      Input,
      readonly unknown[] | null | undefined | (Iterable<unknown> & object)
    > extends infer Wrapped
      ? [Wrapped] extends [never]
        ? never
        : Wrapped[]
      : never);

/**
 * Converts input to an array without mutation; an array input is returned as is,
 * not copied.
 *
 * @shorthand a
 */
export function toArray<Input extends readonly unknown[]>(input: Input): Input;
export function toArray<Input>(input: Input): ToArrayResult<Input>;
export function toArray(input: unknown): readonly unknown[] {
  if (input == null) {
    return [];
  }

  if (isArray(input)) {
    return input;
  }

  if (!isString(input) && isIterable(input)) {
    return Array.from(input);
  }

  return [input];
}
