import type { Maybe } from "#types/Maybe";

/**
 * Splits the string around the last occurrence of the needle; returns the string
 * and `""` when the needle is missing. Nullish input is returned as is.
 */
export function splitLast(string: string, needle: string): [string, string];
export function splitLast<Value extends null | undefined>(
  string: Value,
  needle: string,
): Value;
export function splitLast(
  string: Maybe<string>,
  needle: string,
): Maybe<[string, string]>;
export function splitLast(
  string: Maybe<string>,
  needle: string,
): Maybe<[string, string]> {
  if (string == null) {
    return string;
  }

  const index = string.lastIndexOf(needle);

  return index === -1
    ? [string, ""]
    : [string.slice(0, index), string.slice(index + needle.length)];
}
