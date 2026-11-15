import type { Maybe } from "#types/Maybe";

/**
 * Splits the string around the first occurrence of the needle; returns the string
 * and `""` when the needle is missing. Nullish input is returned as is.
 */
export function splitFirst(string: string, needle: string): [string, string];
export function splitFirst<Value extends null | undefined>(
  string: Value,
  needle: string,
): Value;
export function splitFirst(
  string: Maybe<string>,
  needle: string,
): Maybe<[string, string]>;
export function splitFirst(
  string: Maybe<string>,
  needle: string,
): Maybe<[string, string]> {
  if (string == null) {
    return string;
  }

  const index = string.indexOf(needle);

  return index === -1
    ? [string, ""]
    : [string.slice(0, index), string.slice(index + needle.length)];
}
