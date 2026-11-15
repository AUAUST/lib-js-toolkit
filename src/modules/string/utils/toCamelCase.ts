import { map } from "#modules/array/utils/map";
import { toWordCase } from "#modules/string/internals/toWordCase";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to camelCase, splitting through `splitWords` and casing
 * words following `locale`; nullish input is returned as is.
 *
 * @shorthand camel
 */
export function toCamelCase(string: string, options?: CasingOptions): string;
export function toCamelCase<Value extends null | undefined>(
  string: Value,
  options?: CasingOptions,
): Value;
export function toCamelCase(
  string: Maybe<string>,
  options?: CasingOptions,
): Maybe<string>;
export function toCamelCase(
  string: Maybe<string>,
  options: CasingOptions = {},
): Maybe<string> {
  if (string == null) {
    return string;
  }

  const words = splitWords(string, options);

  return map(words, (word, index) => {
    return toWordCase(word, index > 0, options);
  }).join("");
}
