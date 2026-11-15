import type { Maybe } from "#types/Maybe";

/**
 * Returns the string without the suffix, or the string unchanged when it does
 * not end with it. Nullish input is returned as is.
 */
export function removeSuffix(string: string, suffix: string): string;
export function removeSuffix<Value extends null | undefined>(
  string: Value,
  suffix: string,
): Value;
export function removeSuffix(
  string: Maybe<string>,
  suffix: string,
): Maybe<string>;
export function removeSuffix(
  string: Maybe<string>,
  suffix: string,
): Maybe<string> {
  if (string == null) {
    return string;
  }

  return string.endsWith(suffix)
    ? string.slice(0, string.length - suffix.length)
    : string;
}
