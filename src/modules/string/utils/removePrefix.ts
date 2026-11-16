import type { Maybe } from "#types/Maybe";

/**
 * Returns the string without the prefix, or the string unchanged when it does
 * not start with it. A nullish string returns `undefined`.
 */
export function removePrefix(string: string, prefix: string): string;
export function removePrefix(
  string: null | undefined,
  prefix: string,
): undefined;
export function removePrefix(
  string: Maybe<string>,
  prefix: string,
): string | undefined;
export function removePrefix(
  string: Maybe<string>,
  prefix: string,
): string | undefined {
  if (string != null) {
    return string.startsWith(prefix) ? string.slice(prefix.length) : string;
  }
}
