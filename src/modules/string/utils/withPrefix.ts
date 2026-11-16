import type { Maybe } from "#types/Maybe";

/**
 * Returns the string starting with the prefix, prepending it only when the string
 * does not already start with it. A nullish string returns `undefined`.
 */
export function withPrefix(string: string, prefix: string): string;
export function withPrefix(string: null | undefined, prefix: string): undefined;
export function withPrefix(
  string: Maybe<string>,
  prefix: string,
): string | undefined;
export function withPrefix(
  string: Maybe<string>,
  prefix: string,
): string | undefined {
  if (string != null) {
    return string.startsWith(prefix) ? string : prefix + string;
  }
}
