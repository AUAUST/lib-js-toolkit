import type { Maybe } from "#types/Maybe";

/**
 * Returns the string starting with the prefix, prepending it only when the string
 * does not already start with it. Nullish input is returned as is.
 */
export function withPrefix(string: string, prefix: string): string;
export function withPrefix<Value extends null | undefined>(
  string: Value,
  prefix: string,
): Value;
export function withPrefix(
  string: Maybe<string>,
  prefix: string,
): Maybe<string>;
export function withPrefix(
  string: Maybe<string>,
  prefix: string,
): Maybe<string> {
  if (string == null) {
    return string;
  }

  return string.startsWith(prefix) ? string : prefix + string;
}
