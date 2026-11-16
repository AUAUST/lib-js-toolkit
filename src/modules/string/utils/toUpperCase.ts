import type { Maybe } from "#types/Maybe";

/**
 * Returns the string in uppercase, locale-independently; a nullish string
 * returns `undefined`.
 *
 * @shorthand upper
 * @native nullsafe String.prototype.toUpperCase
 */
export function toUpperCase<Value extends string>(
  string: Value,
): string extends Value ? string : Uppercase<Value>;
export function toUpperCase(string: null | undefined): undefined;
export function toUpperCase(string: Maybe<string>): string | undefined;
export function toUpperCase(string: Maybe<string>): string | undefined {
  return string == null ? undefined : string.toUpperCase();
}
