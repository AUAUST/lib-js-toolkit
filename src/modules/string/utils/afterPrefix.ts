import type { Maybe } from "#types/Maybe";

/**
 * Returns the part of the string after the prefix: `""` when the string equals
 * it, `undefined` when the string does not start with it. A nullish string
 * returns `undefined`.
 */
export function afterPrefix(string: string, prefix: string): string | undefined;
export function afterPrefix(
  string: null | undefined,
  prefix: string,
): undefined;
export function afterPrefix(
  string: Maybe<string>,
  prefix: string,
): string | undefined;
export function afterPrefix(
  string: Maybe<string>,
  prefix: string,
): string | undefined {
  if (string?.startsWith(prefix)) {
    return string.slice(prefix.length);
  }
}
