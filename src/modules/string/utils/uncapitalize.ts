import type { Maybe } from "#types/Maybe";

/**
 * Lowercases the first code point of the string, keeping an astral character
 * whole; nullish input is returned as is.
 */
export function uncapitalize<Value extends string>(
  string: Value,
): string extends Value ? string : Uncapitalize<Value>;
export function uncapitalize<Value extends null | undefined>(
  string: Value,
): Value;
export function uncapitalize(string: Maybe<string>): Maybe<string>;
export function uncapitalize(string: Maybe<string>): Maybe<string> {
  if (string == null) {
    return string;
  }

  const [first = ""] = string;

  return first.toLowerCase() + string.slice(first.length);
}
