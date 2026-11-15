import type { Maybe } from "#types/Maybe";

/**
 * Returns the part of the string after the first occurrence of the needle, or
 * `undefined` when the needle is missing. Nullish input is returned as is.
 *
 * @shorthand after
 */
export function afterFirst(string: string, needle: string): string | undefined;
export function afterFirst<Value extends null | undefined>(
  string: Value,
  needle: string,
): Value;
export function afterFirst(
  string: Maybe<string>,
  needle: string,
): Maybe<string>;
export function afterFirst(
  string: Maybe<string>,
  needle: string,
): Maybe<string> {
  if (string == null) {
    return string;
  }

  const index = string.indexOf(needle);

  return index === -1 ? undefined : string.slice(index + needle.length);
}
