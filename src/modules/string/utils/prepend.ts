import { splitSeparatorOptions } from "#modules/string/internals/splitSeparatorOptions";
import type { SeparatorOptions } from "#modules/string/types/SeparatorOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Prepends the prefixes, in order, to the string, joined by the `separator` of a
 * last options argument. Empty prefixes are kept. Nullish input is returned as is.
 */
export function prepend(
  string: string,
  ...prefixes: [...prefixes: string[], options: SeparatorOptions] | string[]
): string;
export function prepend<Value extends null | undefined>(
  string: Value,
  ...prefixes: [...prefixes: string[], options: SeparatorOptions] | string[]
): Value;
export function prepend(
  string: Maybe<string>,
  ...prefixes: [...prefixes: string[], options: SeparatorOptions] | string[]
): Maybe<string>;
export function prepend(
  string: Maybe<string>,
  ...prefixes: [...prefixes: string[], options: SeparatorOptions] | string[]
): Maybe<string> {
  if (string == null) {
    return string;
  }

  const [strings, separator] = splitSeparatorOptions(prefixes);

  return [...strings, string].join(separator);
}
