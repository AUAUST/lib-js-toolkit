import type { Maybe } from "#types/Maybe";

/**
 * Returns the string without the suffix, or the string unchanged when it does
 * not end with it. A nullish string returns `undefined`.
 */
export function removeSuffix(string: string, suffix: string): string;
export function removeSuffix(
  string: null | undefined,
  suffix: string,
): undefined;
export function removeSuffix(
  string: Maybe<string>,
  suffix: string,
): string | undefined;
export function removeSuffix(
  string: Maybe<string>,
  suffix: string,
): string | undefined {
  if (string != null) {
    return string.endsWith(suffix)
      ? string.slice(0, string.length - suffix.length)
      : string;
  }
}
