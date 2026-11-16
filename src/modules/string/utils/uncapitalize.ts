import { toLowerCase } from "#modules/string/utils/toLowerCase";
import type { Maybe } from "#types/Maybe";

/**
 * Lowercases the first code point of the string, keeping an astral character
 * whole; a nullish string returns `undefined`.
 */
export function uncapitalize<Value extends string>(
  string: Value,
): string extends Value ? string : Uncapitalize<Value>;
export function uncapitalize(string: null | undefined): undefined;
export function uncapitalize(string: Maybe<string>): string | undefined;
export function uncapitalize(string: Maybe<string>): string | undefined {
  if (string == null) {
    return;
  }

  const [first = ""] = string;

  return toLowerCase(first) + string.slice(first.length);
}
