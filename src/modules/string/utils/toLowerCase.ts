import type { Maybe } from "#types/Maybe";

/**
 * Returns the string in lowercase, locale-independently; a nullish string
 * returns `undefined`.
 *
 * @shorthand lower
 * @native nullsafe String.prototype.toLowerCase
 */
export function toLowerCase<Value extends string>(
  string: Value,
): string extends Value ? string : Lowercase<Value>;
export function toLowerCase(string: null | undefined): undefined;
export function toLowerCase(string: Maybe<string>): string | undefined;
export function toLowerCase(string: Maybe<string>): string | undefined {
  return string == null ? undefined : string.toLowerCase();
}
