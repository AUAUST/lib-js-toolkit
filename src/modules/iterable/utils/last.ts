import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the last value of an iterable, reading it to its end, or `undefined`
 * when it yields none. A nullish source returns `undefined`.
 *
 * @throws {TypeError} when the source is not iterable.
 */
export function last<Input>(
  iterable: Maybe<Iterable<Input>>,
): Input | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  let result: Input | undefined;

  for (const value of iterable) {
    result = value;
  }

  return result;
}
