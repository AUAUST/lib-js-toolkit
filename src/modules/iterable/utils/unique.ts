import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Lazily yields each distinct value of an iterable once, at its first occurrence,
 * compared by SameValueZero so `NaN` matches `NaN`; returns a new single-use
 * iterator and never mutates the source. A nullish source returns `undefined`.
 *
 * @throws {TypeError} at call time when the source is not iterable.
 */
export function unique<Input>(
  iterable: Iterable<Input>,
): IteratorObject<Input, undefined>;
export function unique<Input>(
  iterable: Maybe<Iterable<Input>>,
): IteratorObject<Input, undefined> | undefined;
export function unique(
  iterable: Maybe<Iterable<unknown>>,
): IteratorObject<unknown, undefined> | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  return uniqueValues(iterable);
}

function* uniqueValues<Input>(
  iterable: Iterable<Input>,
): Generator<Input, undefined, unknown> {
  const seen = new Set<Input>();

  for (const value of iterable) {
    if (seen.has(value)) {
      continue;
    }

    seen.add(value);

    yield value;
  }
}
