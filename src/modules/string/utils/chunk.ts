import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import type { Maybe } from "#types/Maybe";

/**
 * Splits the string into parts of `size` code points; the last part holds the
 * remainder. Nullish input is returned as is.
 *
 * @throws {RangeError} when the size is not a positive safe integer.
 */
export function chunk(string: string, size: number): string[];
export function chunk<Value extends null | undefined>(
  string: Value,
  size: number,
): Value;
export function chunk(string: Maybe<string>, size: number): Maybe<string[]>;
export function chunk(string: Maybe<string>, size: number): Maybe<string[]> {
  if (!isSafeInteger(size) || size < 1) {
    throw new RangeError("A chunk size must be a positive safe integer.");
  }

  if (string == null) {
    return string;
  }

  const codePoints = [...string];
  const chunks: string[] = [];

  for (let index = 0; index < codePoints.length; index += size) {
    chunks.push(codePoints.slice(index, index + size).join(""));
  }

  return chunks;
}
