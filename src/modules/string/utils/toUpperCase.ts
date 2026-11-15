import type { Maybe } from "#types/Maybe";

/**
 * Returns the string in uppercase, locale-independently; nullish input
 * is returned as is.
 *
 * @shorthand upper
 * @native nullsafe String.prototype.toUpperCase
 */
export function toUpperCase<Value extends string>(
  string: Value,
): string extends Value ? string : Uppercase<Value>;
export function toUpperCase<Value extends null | undefined>(
  string: Value,
): Value;
export function toUpperCase(string: Maybe<string>): Maybe<string>;
export function toUpperCase(string: Maybe<string>): Maybe<string> {
  return string == null ? string : string.toUpperCase();
}
