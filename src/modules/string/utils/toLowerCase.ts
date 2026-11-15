import type { Maybe } from "#types/Maybe";

/**
 * Returns the string in lowercase, locale-independently; nullish input
 * is returned as is.
 *
 * @shorthand lower
 * @native nullsafe String.prototype.toLowerCase
 */
export function toLowerCase<Value extends string>(
  string: Value,
): string extends Value ? string : Lowercase<Value>;
export function toLowerCase<Value extends null | undefined>(
  string: Value,
): Value;
export function toLowerCase(string: Maybe<string>): Maybe<string>;
export function toLowerCase(string: Maybe<string>): Maybe<string> {
  return string == null ? string : string.toLowerCase();
}
