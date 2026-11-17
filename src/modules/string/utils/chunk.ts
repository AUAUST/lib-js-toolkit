import { isSafeInteger } from "#modules/number/guards/isSafeInteger";
import type { Maybe } from "#types/Maybe";

/**
 * Splits the string into parts of `size` code points; the last part holds the
 * remainder. A nullish string returns `undefined`.
 *
 * @throws {RangeError} when the size is not a positive safe integer.
 */
export function chunk(string: string, size: number): string[];
export function chunk(string: null | undefined, size: number): undefined;
export function chunk(
  string: Maybe<string>,
  size: number,
): string[] | undefined;
export function chunk(
  string: Maybe<string>,
  size: number,
): string[] | undefined {
  // @debt The positive-integer size check is duplicated across `array.chunk`, `iterable.chunk` and `string.chunk`; a shared guard in the number domain would own it (backlog utils.10).
  if (!isSafeInteger(size) || size < 1) {
    throw new RangeError("A chunk size must be a positive safe integer.");
  }

  if (string == null) {
    return;
  }

  const codePoints = [...string];
  const chunks: string[] = [];

  for (let index = 0; index < codePoints.length; index += size) {
    chunks.push(codePoints.slice(index, index + size).join(""));
  }

  return chunks;
}
