import { toUpperCase } from "#modules/string/utils/toUpperCase";
import type { Maybe } from "#types/Maybe";

/**
 * Uppercases the first code point of the string, keeping an astral character
 * whole; a nullish string returns `undefined`.
 */
export function capitalize<Value extends string>(
  string: Value,
): string extends Value ? string : Capitalize<Value>;
export function capitalize(string: null | undefined): undefined;
export function capitalize(string: Maybe<string>): string | undefined;
export function capitalize(string: Maybe<string>): string | undefined {
  if (string == null) {
    return;
  }

  const [first = ""] = string;

  return toUpperCase(first) + string.slice(first.length);
}
