import { isSafeInteger } from "#modules/number/guards/isSafeInteger";

/**
 * Checks the arguments of `truncateStart` and `truncateEnd`.
 *
 * @throws {RangeError} when the length is not a non-negative safe integer, or a
 * non-empty ellipsis is not shorter than it.
 */
export function assertTruncation(length: number, ellipsis: string): void {
  if (!isSafeInteger(length) || length < 0) {
    throw new RangeError(
      "A truncation length must be a non-negative safe integer.",
    );
  }

  const ellipsisLength = [...ellipsis].length;

  if (ellipsisLength > 0 && ellipsisLength >= length) {
    throw new RangeError(
      "An ellipsis must be shorter than the truncation length.",
    );
  }
}
