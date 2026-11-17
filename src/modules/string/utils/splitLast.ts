import type { Maybe } from "#types/Maybe";

/**
 * Splits the string around the last occurrence of the needle. The part before
 * it is `undefined` when the needle is missing, leaving the whole string
 * after it, and `""` when the needle starts the string. A nullish string
 * returns `undefined`.
 */
export function splitLast(
  string: string,
  needle: string,
): [string | undefined, string];
export function splitLast(string: null | undefined, needle: string): undefined;
export function splitLast(
  string: Maybe<string>,
  needle: string,
): [string | undefined, string] | undefined;
export function splitLast(
  string: Maybe<string>,
  needle: string,
): [string | undefined, string] | undefined {
  if (string == null) {
    return;
  }

  const index = string.lastIndexOf(needle);

  return index === -1
    ? [undefined, string]
    : [string.slice(0, index), string.slice(index + needle.length)];
}
