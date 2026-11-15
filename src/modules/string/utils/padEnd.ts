import type { Maybe } from "#types/Maybe";

/**
 * Pads the end of the string with `filler`, a space by default, up to `length`
 * code units; an empty filler leaves the string unchanged. Nullish input
 * is returned as is.
 *
 * @native equal String.prototype.padEnd
 */
export function padEnd(string: string, length: number, filler?: string): string;
export function padEnd<Value extends null | undefined>(
  string: Value,
  length: number,
  filler?: string,
): Value;
export function padEnd(
  string: Maybe<string>,
  length: number,
  filler?: string,
): Maybe<string>;
export function padEnd(
  string: Maybe<string>,
  length: number,
  filler?: string,
): Maybe<string> {
  return string == null ? string : string.padEnd(length, filler);
}
