import { isIterable } from "#modules/iterable/guards/isIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Tells whether an iterable yields a value twice, compared by SameValueZero so
 * `NaN` matches `NaN`, reading no further and closing the source at the first
 * repeat. A nullish source returns `undefined`.
 *
 * @throws {TypeError} when the source is not iterable.
 */
export function hasDuplicates(iterable: Iterable<unknown>): boolean;
export function hasDuplicates(
  iterable: Maybe<Iterable<unknown>>,
): boolean | undefined;
export function hasDuplicates(
  iterable: Maybe<Iterable<unknown>>,
): boolean | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  const seen = new Set<unknown>();

  for (const value of iterable) {
    if (seen.has(value)) {
      return true;
    }

    seen.add(value);
  }

  return false;
}
