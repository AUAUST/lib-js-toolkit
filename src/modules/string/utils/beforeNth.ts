import { assertOccurrencePosition } from "#modules/string/internals/assertOccurrencePosition";
import { nthIndexOf } from "#modules/string/utils/nthIndexOf";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the part of the string before the needle's occurrence at the zero-based
 * position, located as `nthIndexOf` does, or `undefined` when that occurrence
 * does not exist. A nullish string returns `undefined`.
 *
 * @throws {RangeError} when the position is not an integer.
 */
export function beforeNth(
  string: string,
  needle: string,
  position: number,
): string | undefined;
export function beforeNth(
  string: null | undefined,
  needle: string,
  position: number,
): undefined;
export function beforeNth(
  string: Maybe<string>,
  needle: string,
  position: number,
): string | undefined;
export function beforeNth(
  string: Maybe<string>,
  needle: string,
  position: number,
): string | undefined {
  assertOccurrencePosition(position);

  if (string == null) {
    return;
  }

  const index = nthIndexOf(string, needle, position);

  return index === -1 ? undefined : string.slice(0, index);
}
