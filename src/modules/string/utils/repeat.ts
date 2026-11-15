import type { Maybe } from "#types/Maybe";

/**
 * Returns the string repeated `count` times. Nullish input is returned as is.
 *
 * @throws {RangeError} when the count is negative or infinite.
 * @native nullsafe String.prototype.repeat
 */
export function repeat(string: string, count: number): string;
export function repeat<Value extends null | undefined>(
  string: Value,
  count: number,
): Value;
export function repeat(string: Maybe<string>, count: number): Maybe<string>;
export function repeat(string: Maybe<string>, count: number): Maybe<string> {
  return string == null ? string : string.repeat(count);
}
