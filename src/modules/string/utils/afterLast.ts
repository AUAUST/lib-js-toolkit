import type { Maybe } from "#types/Maybe";

/**
 * Returns the part of the string after the last occurrence of the needle, or
 * `undefined` when the needle is missing. Nullish input is returned as is.
 */
export function afterLast(string: string, needle: string): string | undefined;
export function afterLast<Value extends null | undefined>(
  string: Value,
  needle: string,
): Value;
export function afterLast(string: Maybe<string>, needle: string): Maybe<string>;
export function afterLast(
  string: Maybe<string>,
  needle: string,
): Maybe<string> {
  if (string == null) {
    return string;
  }

  const index = string.lastIndexOf(needle);

  return index === -1 ? undefined : string.slice(index + needle.length);
}
