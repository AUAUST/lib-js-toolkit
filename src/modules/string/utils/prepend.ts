import { join } from "#modules/array/utils/join";
import { splitSeparatorOptions } from "#modules/string/internals/splitSeparatorOptions";
import type { SeparatorOptions } from "#modules/string/types/SeparatorOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Prepends the prefixes, in order, to the string, joined by the `separator`
 * of a last options argument. Empty prefixes are kept. A nullish string
 * returns `undefined`.
 */
export function prepend(
  string: string,
  ...prefixes: [...prefixes: string[], options: SeparatorOptions] | string[]
): string;
export function prepend(
  string: null | undefined,
  ...prefixes: [...prefixes: string[], options: SeparatorOptions] | string[]
): undefined;
export function prepend(
  string: Maybe<string>,
  ...prefixes: [...prefixes: string[], options: SeparatorOptions] | string[]
): string | undefined;
export function prepend(
  string: Maybe<string>,
  ...prefixes: [...prefixes: string[], options: SeparatorOptions] | string[]
): string | undefined {
  if (string == null) {
    return;
  }

  const [strings, separator] = splitSeparatorOptions(prefixes);

  return join([...strings, string], separator);
}
