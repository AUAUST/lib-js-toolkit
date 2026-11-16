import type { Maybe } from "#types/Maybe";

/**
 * Returns the part of the string before the last occurrence of the needle, or
 * `undefined` when the needle is missing. A nullish string returns `undefined`.
 */
export function beforeLast(string: string, needle: string): string | undefined;
export function beforeLast(string: null | undefined, needle: string): undefined;
export function beforeLast(
  string: Maybe<string>,
  needle: string,
): string | undefined;
export function beforeLast(
  string: Maybe<string>,
  needle: string,
): string | undefined {
  if (string == null) {
    return;
  }

  const index = string.lastIndexOf(needle);

  return index === -1 ? undefined : string.slice(0, index);
}
