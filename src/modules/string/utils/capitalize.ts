import { toUpperCase } from "#modules/string/utils/toUpperCase";
import type { Maybe } from "#types/Maybe";

/**
 * Uppercases the first code point of the string, keeping an astral character
 * whole; nullish input is returned as is.
 */
export function capitalize<Value extends string>(
  string: Value,
): string extends Value ? string : Capitalize<Value>;
export function capitalize<Value extends null | undefined>(
  string: Value,
): Value;
export function capitalize(string: Maybe<string>): Maybe<string>;
export function capitalize(string: Maybe<string>): Maybe<string> {
  if (string == null) {
    return string;
  }

  const [first = ""] = string;

  return toUpperCase(first) + string.slice(first.length);
}
