import type { Maybe } from "#types/Maybe";

/**
 * Pads the end of the string with `filler`, a space by default, up to `length`
 * code units; an empty filler leaves the string unchanged. A nullish string
 * returns `undefined`.
 *
 * @native equal String.prototype.padEnd
 */
export function padEnd(string: string, length: number, filler?: string): string;
export function padEnd(
  string: null | undefined,
  length: number,
  filler?: string,
): undefined;
export function padEnd(
  string: Maybe<string>,
  length: number,
  filler?: string,
): string | undefined;
export function padEnd(
  string: Maybe<string>,
  length: number,
  filler?: string,
): string | undefined {
  return string == null ? undefined : string.padEnd(length, filler);
}
