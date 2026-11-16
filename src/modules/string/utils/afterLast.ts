import type { Maybe } from "#types/Maybe";

/**
 * Returns the part of the string after the last occurrence of the needle, or
 * `undefined` when the needle is missing. A nullish string returns `undefined`.
 */
export function afterLast(string: string, needle: string): string | undefined;
export function afterLast(string: null | undefined, needle: string): undefined;
export function afterLast(
  string: Maybe<string>,
  needle: string,
): string | undefined;
export function afterLast(
  string: Maybe<string>,
  needle: string,
): string | undefined {
  if (string == null) {
    return;
  }

  const index = string.lastIndexOf(needle);

  return index === -1 ? undefined : string.slice(index + needle.length);
}
