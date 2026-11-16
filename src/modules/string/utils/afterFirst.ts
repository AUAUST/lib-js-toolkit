import type { Maybe } from "#types/Maybe";

/**
 * Returns the part of the string after the first occurrence of the needle, or
 * `undefined` when the needle is missing. A nullish string returns `undefined`.
 *
 * @shorthand after
 */
export function afterFirst(string: string, needle: string): string | undefined;
export function afterFirst(string: null | undefined, needle: string): undefined;
export function afterFirst(
  string: Maybe<string>,
  needle: string,
): string | undefined;
export function afterFirst(
  string: Maybe<string>,
  needle: string,
): string | undefined {
  if (string == null) {
    return;
  }

  const index = string.indexOf(needle);

  return index === -1 ? undefined : string.slice(index + needle.length);
}
