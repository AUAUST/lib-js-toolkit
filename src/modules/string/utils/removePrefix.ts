import type { Maybe } from "#types/Maybe";

/**
 * Returns the string without the prefix, or the string unchanged when it does
 * not start with it. Nullish input is returned as is.
 */
export function removePrefix(string: string, prefix: string): string;
export function removePrefix<Value extends null | undefined>(
  string: Value,
  prefix: string,
): Value;
export function removePrefix(
  string: Maybe<string>,
  prefix: string,
): Maybe<string>;
export function removePrefix(
  string: Maybe<string>,
  prefix: string,
): Maybe<string> {
  if (string == null) {
    return string;
  }

  return string.startsWith(prefix) ? string.slice(prefix.length) : string;
}
