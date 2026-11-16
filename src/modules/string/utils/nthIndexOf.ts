import { assertOccurrencePosition } from "#modules/string/internals/assertOccurrencePosition";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the index of the needle's occurrence at the zero-based position,
 * occurrences possibly overlapping; a negative position counts from the end, `-1`
 * being the last occurrence. Returns `-1` when that occurrence does not exist;
 * a nullish string returns `undefined`.
 *
 * @throws {RangeError} when the position is not an integer.
 */
export function nthIndexOf(
  string: string,
  needle: string,
  position: number,
): number;
export function nthIndexOf(
  string: null | undefined,
  needle: string,
  position: number,
): undefined;
export function nthIndexOf(
  string: Maybe<string>,
  needle: string,
  position: number,
): number | undefined;
export function nthIndexOf(
  string: Maybe<string>,
  needle: string,
  position: number,
): number | undefined {
  assertOccurrencePosition(position);

  if (string != null) {
    return position < 0
      ? lastNthIndexOf(string, needle, -position)
      : firstNthIndexOf(string, needle, position + 1);
  }
}

function firstNthIndexOf(
  string: string,
  needle: string,
  count: number,
): number {
  let index = string.indexOf(needle);

  for (let remaining = count - 1; remaining > 0 && index !== -1; remaining--) {
    index = index < string.length ? string.indexOf(needle, index + 1) : -1;
  }

  return index;
}

function lastNthIndexOf(string: string, needle: string, count: number): number {
  let index = string.lastIndexOf(needle);

  for (let remaining = count - 1; remaining > 0 && index !== -1; remaining--) {
    index = index > 0 ? string.lastIndexOf(needle, index - 1) : -1;
  }

  return index;
}
