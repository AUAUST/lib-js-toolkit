import { map } from "#modules/array/utils/map";
import { toWordCase } from "#modules/string/internals/toWordCase";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to camelCase, splitting through `splitWords`, which drops
 * characters that are neither letters, marks nor digits, and casing words
 * following `locale`; a nullish string returns `undefined`.
 *
 * @shorthand camel
 */
export function toCamelCase(string: string, options?: CasingOptions): string;
export function toCamelCase(
  string: null | undefined,
  options?: CasingOptions,
): undefined;
export function toCamelCase(
  string: Maybe<string>,
  options?: CasingOptions,
): string | undefined;
export function toCamelCase(
  string: Maybe<string>,
  options: CasingOptions = {},
): string | undefined {
  if (string == null) {
    return;
  }

  const words = splitWords(string, options);

  return map(words, (word, index) => {
    return toWordCase(word, index > 0, options);
  }).join("");
}
