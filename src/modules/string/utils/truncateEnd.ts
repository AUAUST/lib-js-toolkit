import { assertTruncation } from "#modules/string/internals/assertTruncation";
import type { Maybe } from "#types/Maybe";

/**
 * Shortens the string to `length` code points by cutting its end, replacing the
 * cut part with `ellipsis`. A string within the length is returned unchanged.
 * Nullish input is returned as is.
 *
 * @throws {RangeError} when the length is not a non-negative safe integer, or a
 * non-empty ellipsis is not shorter than it.
 */
export function truncateEnd(
  string: string,
  length: number,
  ellipsis?: string,
): string;
export function truncateEnd<Value extends null | undefined>(
  string: Value,
  length: number,
  ellipsis?: string,
): Value;
export function truncateEnd(
  string: Maybe<string>,
  length: number,
  ellipsis?: string,
): Maybe<string>;
export function truncateEnd(
  string: Maybe<string>,
  length: number,
  ellipsis = "",
): Maybe<string> {
  assertTruncation(length, ellipsis);

  if (string == null) {
    return string;
  }

  const codePoints = [...string];

  if (codePoints.length <= length) {
    return string;
  }

  const ellipsisLength = [...ellipsis].length;

  return codePoints.slice(0, length - ellipsisLength).join("") + ellipsis;
}
