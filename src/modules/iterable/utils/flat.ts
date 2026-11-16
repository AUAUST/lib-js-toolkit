import { isIterable } from "#modules/iterable/guards/isIterable";
import { isFlattenable } from "#modules/iterable/internals/isFlattenable";
import type { Maybe } from "#types/Maybe";

// @debt The depth decrement tuple duplicates the lib's `FlatArray` table; a shared depth-decrement type would own it.
/**
 * The values `flat` yields from an iterable of `Value` flattened `Depth` levels
 * deep, as the lib's `FlatArray`; strings are never flattened.
 */
export type FlatIterableValue<Value, Depth extends number> = {
  done: Value;
  recur: Value extends Iterable<infer Inner> & object
    ? FlatIterableValue<
        Inner,
        [
          -1,
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
        ][Depth]
      >
    : Value;
}[Depth extends 0 | -1 ? "done" : "recur"];

/**
 * Lazily yields the values of an iterable, recursing into each value that is a
 * non-string iterable object while `depth` remains, as `Array.prototype.flat`;
 * returns a new single-use iterator and never mutates the source. A `depth` of
 * `0`, a negative one or `NaN` flattens nothing; `Infinity` flattens all. The
 * source is read lazily: changes made to it before a value is pulled are visible.
 * A nullish source returns `undefined`.
 *
 * @throws {TypeError} at call time when the source is not iterable.
 */
export function flat<Value, Depth extends number = 1>(
  iterable: Iterable<Value>,
  depth?: Depth,
): IteratorObject<FlatIterableValue<Value, Depth>, undefined>;
export function flat<Value, Depth extends number = 1>(
  iterable: Maybe<Iterable<Value>>,
  depth?: Depth,
): IteratorObject<FlatIterableValue<Value, Depth>, undefined> | undefined;
export function flat(
  iterable: Maybe<Iterable<unknown>>,
  depth = 1,
): IteratorObject<unknown, undefined> | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  return flattened(iterable, depth);
}

function* flattened(
  iterable: Iterable<unknown>,
  depth: number,
): Generator<unknown, undefined, undefined> {
  for (const value of iterable) {
    if (depth >= 1 && isFlattenable(value)) {
      yield* flattened(value, depth - 1);
    } else {
      yield value;
    }
  }
}
