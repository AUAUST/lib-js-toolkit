import type { Maybe } from "#types/Maybe";

/**
 * Pads the start of the string with `filler`, a space by default, up to
 * `length` code units; an empty filler leaves the string unchanged. Nullish
 * input is returned as is.
 *
 * @native equal String.prototype.padStart
 */
export function padStart(
  string: string,
  length: number,
  filler?: string,
): string;
export function padStart<Value extends null | undefined>(
  string: Value,
  length: number,
  filler?: string,
): Value;
export function padStart(
  string: Maybe<string>,
  length: number,
  filler?: string,
): Maybe<string>;
export function padStart(
  string: Maybe<string>,
  length: number,
  filler?: string,
): Maybe<string> {
  return string == null ? string : string.padStart(length, filler);
}
