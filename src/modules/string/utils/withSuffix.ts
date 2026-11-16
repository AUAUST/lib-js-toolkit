import type { Maybe } from "#types/Maybe";

/**
 * Returns the string ending with the suffix, appending it only when the string
 * does not already end with it. A nullish string returns `undefined`.
 */
export function withSuffix(string: string, suffix: string): string;
export function withSuffix(string: null | undefined, suffix: string): undefined;
export function withSuffix(
  string: Maybe<string>,
  suffix: string,
): string | undefined;
export function withSuffix(
  string: Maybe<string>,
  suffix: string,
): string | undefined {
  if (string != null) {
    return string.endsWith(suffix) ? string : string + suffix;
  }
}
