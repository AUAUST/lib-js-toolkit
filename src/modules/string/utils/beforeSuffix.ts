import type { Maybe } from "#types/Maybe";

/**
 * Returns the part of the string before the suffix: `""` when the string equals
 * it, `undefined` when the string does not end with it. A nullish string
 * returns `undefined`.
 */
export function beforeSuffix(
  string: string,
  suffix: string,
): string | undefined;
export function beforeSuffix(
  string: null | undefined,
  suffix: string,
): undefined;
export function beforeSuffix(
  string: Maybe<string>,
  suffix: string,
): string | undefined;
export function beforeSuffix(
  string: Maybe<string>,
  suffix: string,
): string | undefined {
  if (string?.endsWith(suffix)) {
    return string.slice(0, string.length - suffix.length);
  }
}
