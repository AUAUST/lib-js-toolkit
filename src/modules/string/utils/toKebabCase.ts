import { joinLowercaseWords } from "#modules/string/internals/joinLowercaseWords";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to kebab-case, splitting through `splitWords` and casing
 * words following `locale`; nullish input is returned as is.
 *
 * @shorthand kebab
 */
export function toKebabCase(string: string, options?: CasingOptions): string;
export function toKebabCase<Value extends null | undefined>(
  string: Value,
  options?: CasingOptions,
): Value;
export function toKebabCase(
  string: Maybe<string>,
  options?: CasingOptions,
): Maybe<string>;
export function toKebabCase(
  string: Maybe<string>,
  options: CasingOptions = {},
): Maybe<string> {
  if (string == null) {
    return string;
  }

  const words = splitWords(string, options);

  return joinLowercaseWords(words, "-", options);
}
