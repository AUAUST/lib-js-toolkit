import { assertOccurrencePosition } from "#modules/string/internals/assertOccurrencePosition";
import { nthIndexOf } from "#modules/string/utils/nthIndexOf";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the part of the string after the needle's occurrence at the zero-based
 * position, located as `nthIndexOf` does, or `undefined` when that occurrence
 * does not exist. Nullish input is returned as is.
 *
 * @throws {RangeError} when the position is not an integer.
 */
export function afterNth(
  string: string,
  needle: string,
  position: number,
): string | undefined;
export function afterNth<Value extends null | undefined>(
  string: Value,
  needle: string,
  position: number,
): Value;
export function afterNth(
  string: Maybe<string>,
  needle: string,
  position: number,
): Maybe<string>;
export function afterNth(
  string: Maybe<string>,
  needle: string,
  position: number,
): Maybe<string> {
  assertOccurrencePosition(position);

  if (string == null) {
    return string;
  }

  const index = nthIndexOf(string, needle, position);

  return index === -1 ? undefined : string.slice(index + needle.length);
}
