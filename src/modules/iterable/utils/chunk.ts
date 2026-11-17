import { isIterable } from "#modules/iterable/guards/isIterable";
import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import type { Maybe } from "#types/Maybe";

/**
 * Lazily groups the values of an iterable into new arrays of `size` values,
 * yielding each once full and the shorter remainder last, never an empty one;
 * returns a new single-use iterator and never mutates the source. A nullish
 * source returns `undefined`.
 *
 * @throws {RangeError} when the size is not a positive safe integer.
 * @throws {TypeError} at call time when the source is not iterable.
 */
export function chunk<Item>(
  iterable: Iterable<Item>,
  size: number,
): IteratorObject<Item[], undefined>;
export function chunk(iterable: null | undefined, size: number): undefined;
export function chunk<Item>(
  iterable: Maybe<Iterable<Item>>,
  size: number,
): IteratorObject<Item[], undefined> | undefined;
export function chunk<Item>(
  iterable: Maybe<Iterable<Item>>,
  size: number,
): IteratorObject<Item[], undefined> | undefined {
  // @debt The positive-integer size check is duplicated across `array.chunk`, `iterable.chunk` and `string.chunk`; a shared guard in the number domain would own it (backlog utils.10).
  if (!isSafeInteger(size) || size < 1) {
    throw new RangeError("A chunk size must be a positive safe integer.");
  }

  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  return chunked(iterable, size);
}

function* chunked<Item>(
  iterable: Iterable<Item>,
  size: number,
): Generator<Item[], undefined, unknown> {
  let batch: Item[] = [];

  for (const value of iterable) {
    batch.push(value);

    if (batch.length !== size) {
      continue;
    }

    yield batch;

    batch = [];
  }

  if (batch.length > 0) {
    yield batch;
  }
}
