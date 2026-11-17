import { join } from "#modules/array/utils/join";
import { assertTruncation } from "#modules/string/internals/assertTruncation";
import type { Maybe } from "#types/Maybe";

/**
 * Shortens the string to `length` code points by cutting its start, replacing the
 * cut part with `ellipsis`. A string within the length is returned unchanged. A
 * nullish string returns `undefined`.
 *
 * @throws {RangeError} when the length is not a non-negative safe integer, or a
 * non-empty ellipsis is not shorter than it.
 */
export function truncateStart(
  string: string,
  length: number,
  ellipsis?: string,
): string;
export function truncateStart(
  string: null | undefined,
  length: number,
  ellipsis?: string,
): undefined;
export function truncateStart(
  string: Maybe<string>,
  length: number,
  ellipsis?: string,
): string | undefined;
export function truncateStart(
  string: Maybe<string>,
  length: number,
  ellipsis = "",
): string | undefined {
  assertTruncation(length, ellipsis);

  if (string == null) {
    return;
  }

  const codePoints = [...string];

  if (codePoints.length <= length) {
    return string;
  }

  const ellipsisLength = [...ellipsis].length;

  return (
    ellipsis +
    join(codePoints.slice(codePoints.length - length + ellipsisLength), "")
  );
}
