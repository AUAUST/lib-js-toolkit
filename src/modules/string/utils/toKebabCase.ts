import { joinLowercaseWords } from "#modules/string/internals/joinLowercaseWords";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to kebab-case, splitting through `splitWords`, which
 * drops characters that are neither letters, marks nor digits, and casing words
 * following `locale`; a nullish string returns `undefined`.
 *
 * @shorthand kebab
 */
export function toKebabCase(string: string, options?: CasingOptions): string;
export function toKebabCase(
  string: null | undefined,
  options?: CasingOptions,
): undefined;
export function toKebabCase(
  string: Maybe<string>,
  options?: CasingOptions,
): string | undefined;
export function toKebabCase(
  string: Maybe<string>,
  options: CasingOptions = {},
): string | undefined {
  if (string == null) {
    return;
  }

  const words = splitWords(string, options);

  return joinLowercaseWords(words, "-", options);
}
