import { assertOccurrencePosition } from "#modules/string/internals/assertOccurrencePosition";
import { nthIndexOf } from "#modules/string/utils/nthIndexOf";
import type { Maybe } from "#types/Maybe";

/**
 * Splits the string around the needle's occurrence at the zero-based position,
 * located as `nthIndexOf` does; returns the string and `""` when that occurrence
 * does not exist. A nullish string returns `undefined`.
 *
 * @throws {RangeError} when the position is not an integer.
 */
export function splitNth(
  string: string,
  needle: string,
  position: number,
): [string, string];
export function splitNth(
  string: null | undefined,
  needle: string,
  position: number,
): undefined;
export function splitNth(
  string: Maybe<string>,
  needle: string,
  position: number,
): [string, string] | undefined;
export function splitNth(
  string: Maybe<string>,
  needle: string,
  position: number,
): [string, string] | undefined {
  assertOccurrencePosition(position);

  if (string == null) {
    return;
  }

  const index = nthIndexOf(string, needle, position);

  return index === -1
    ? [string, ""]
    : [string.slice(0, index), string.slice(index + needle.length)];
}
