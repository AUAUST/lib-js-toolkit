import { assertTruncation } from "#modules/string/internals/assertTruncation";
import type { Maybe } from "#types/Maybe";

/**
 * Shortens the string to `length` code points by cutting its start, replacing the
 * cut part with `ellipsis`. A string within the length is returned unchanged.
 * Nullish input is returned as is.
 *
 * @throws {RangeError} when the length is not a non-negative safe integer, or a
 * non-empty ellipsis is not shorter than it.
 */
export function truncateStart(
  string: string,
  length: number,
  ellipsis?: string,
): string;
export function truncateStart<Value extends null | undefined>(
  string: Value,
  length: number,
  ellipsis?: string,
): Value;
export function truncateStart(
  string: Maybe<string>,
  length: number,
  ellipsis?: string,
): Maybe<string>;
export function truncateStart(
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

  return (
    ellipsis +
    codePoints.slice(codePoints.length - length + ellipsisLength).join("")
  );
}
