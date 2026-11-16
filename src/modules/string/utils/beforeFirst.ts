import type { Maybe } from "#types/Maybe";

/**
 * Returns the part of the string before the first occurrence of the needle, or
 * `undefined` when the needle is missing. A nullish string returns `undefined`.
 *
 * @shorthand before
 */
export function beforeFirst(string: string, needle: string): string | undefined;
export function beforeFirst(
  string: null | undefined,
  needle: string,
): undefined;
export function beforeFirst(
  string: Maybe<string>,
  needle: string,
): string | undefined;
export function beforeFirst(
  string: Maybe<string>,
  needle: string,
): string | undefined {
  if (string == null) {
    return;
  }

  const index = string.indexOf(needle);

  return index === -1 ? undefined : string.slice(0, index);
}
