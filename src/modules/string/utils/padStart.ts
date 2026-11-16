import type { Maybe } from "#types/Maybe";

/**
 * Pads the start of the string with `filler`, a space by default, up to `length`
 * code units; an empty filler leaves the string unchanged. A nullish string
 * returns `undefined`.
 *
 * @native equal String.prototype.padStart
 */
export function padStart(
  string: string,
  length: number,
  filler?: string,
): string;
export function padStart(
  string: null | undefined,
  length: number,
  filler?: string,
): undefined;
export function padStart(
  string: Maybe<string>,
  length: number,
  filler?: string,
): string | undefined;
export function padStart(
  string: Maybe<string>,
  length: number,
  filler?: string,
): string | undefined {
  return string == null ? undefined : string.padStart(length, filler);
}
