import type { Maybe } from "#types/Maybe";

/**
 * Splits the string around the first occurrence of the needle. The part after it
 * is `undefined` when the needle is missing and `""` when the needle ends the
 * string. A nullish string returns `undefined`.
 */
export function splitFirst(
  string: string,
  needle: string,
): [string, string | undefined];
export function splitFirst(string: null | undefined, needle: string): undefined;
export function splitFirst(
  string: Maybe<string>,
  needle: string,
): [string, string | undefined] | undefined;
export function splitFirst(
  string: Maybe<string>,
  needle: string,
): [string, string | undefined] | undefined {
  if (string == null) {
    return;
  }

  const index = string.indexOf(needle);

  return index === -1
    ? [string, undefined]
    : [string.slice(0, index), string.slice(index + needle.length)];
}
