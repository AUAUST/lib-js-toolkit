import { assertOccurrencePosition } from "#modules/string/internals/assertOccurrencePosition";
import { nthIndexOf } from "#modules/string/utils/nthIndexOf";
import type { Maybe } from "#types/Maybe";

/**
 * Splits the string around the needle's occurrence at the zero-based position,
 * located as `nthIndexOf` does; returns the string and `""` when that occurrence
 * does not exist. Nullish input is returned as is.
 *
 * @throws {RangeError} when the position is not an integer.
 */
export function splitNth(
  string: string,
  needle: string,
  position: number,
): [string, string];
export function splitNth<Value extends null | undefined>(
  string: Value,
  needle: string,
  position: number,
): Value;
export function splitNth(
  string: Maybe<string>,
  needle: string,
  position: number,
): Maybe<[string, string]>;
export function splitNth(
  string: Maybe<string>,
  needle: string,
  position: number,
): Maybe<[string, string]> {
  assertOccurrencePosition(position);

  if (string == null) {
    return string;
  }

  const index = nthIndexOf(string, needle, position);

  return index === -1
    ? [string, ""]
    : [string.slice(0, index), string.slice(index + needle.length)];
}
