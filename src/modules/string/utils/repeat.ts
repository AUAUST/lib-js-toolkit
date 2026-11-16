import type { Maybe } from "#types/Maybe";

/**
 * Returns the string repeated `count` times. A nullish string returns `undefined`.
 *
 * @throws {RangeError} when the count is negative or infinite.
 * @native nullsafe String.prototype.repeat
 */
export function repeat(string: string, count: number): string;
export function repeat(string: null | undefined, count: number): undefined;
export function repeat(
  string: Maybe<string>,
  count: number,
): string | undefined;
export function repeat(
  string: Maybe<string>,
  count: number,
): string | undefined {
  return string == null ? undefined : string.repeat(count);
}
