import { map } from "#modules/array/utils/map";
import { toWordCase } from "#modules/string/internals/toWordCase";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to PascalCase, splitting through `splitWords` and casing
 * words following `locale`; nullish input is returned as is.
 *
 * @shorthand pascal
 */
export function toPascalCase(string: string, options?: CasingOptions): string;
export function toPascalCase<Value extends null | undefined>(
  string: Value,
  options?: CasingOptions,
): Value;
export function toPascalCase(
  string: Maybe<string>,
  options?: CasingOptions,
): Maybe<string>;
export function toPascalCase(
  string: Maybe<string>,
  options: CasingOptions = {},
): Maybe<string> {
  if (string == null) {
    return string;
  }

  const words = splitWords(string, options);

  return map(words, (word) => {
    return toWordCase(word, true, options);
  }).join("");
}
