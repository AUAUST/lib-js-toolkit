import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the first value of an iterable, or `undefined` when it yields none,
 * reading no further and closing the source. A nullish source returns `undefined`.
 *
 * @throws {TypeError} when the source is not iterable.
 */
export function first<Input>(
  iterable: Maybe<Iterable<Input>>,
): Input | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  const [value] = iterable;

  return value;
}
