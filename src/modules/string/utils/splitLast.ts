import type { Maybe } from "#types/Maybe";

/**
 * Splits the string around the last occurrence of the needle; returns the string
 * and `""` when the needle is missing. A nullish string returns `undefined`.
 */
export function splitLast(string: string, needle: string): [string, string];
export function splitLast(string: null | undefined, needle: string): undefined;
export function splitLast(
  string: Maybe<string>,
  needle: string,
): [string, string] | undefined;
export function splitLast(
  string: Maybe<string>,
  needle: string,
): [string, string] | undefined {
  if (string == null) {
    return;
  }

  const index = string.lastIndexOf(needle);

  return index === -1
    ? [string, ""]
    : [string.slice(0, index), string.slice(index + needle.length)];
}
