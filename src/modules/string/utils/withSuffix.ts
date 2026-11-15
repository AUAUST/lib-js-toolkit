import type { Maybe } from "#types/Maybe";

/**
 * Returns the string ending with the suffix, appending it only when the string
 * does not already end with it. Nullish input is returned as is.
 */
export function withSuffix(string: string, suffix: string): string;
export function withSuffix<Value extends null | undefined>(
  string: Value,
  suffix: string,
): Value;
export function withSuffix(
  string: Maybe<string>,
  suffix: string,
): Maybe<string>;
export function withSuffix(
  string: Maybe<string>,
  suffix: string,
): Maybe<string> {
  if (string == null) {
    return string;
  }

  return string.endsWith(suffix) ? string : string + suffix;
}
