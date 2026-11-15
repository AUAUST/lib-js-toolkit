import { map } from "#modules/array/utils/map";
import { toWordCase } from "#modules/string/internals/toWordCase";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to Title Case, splitting through `splitWords`, then
 * capitalizing each word following `locale` and joining them with spaces; nullish
 * input is returned as is.
 *
 * @shorthand title
 */
export function toTitleCase(string: string, options?: CasingOptions): string;
export function toTitleCase<Value extends null | undefined>(
  string: Value,
  options?: CasingOptions,
): Value;
export function toTitleCase(
  string: Maybe<string>,
  options?: CasingOptions,
): Maybe<string>;
export function toTitleCase(
  string: Maybe<string>,
  options: CasingOptions = {},
): Maybe<string> {
  if (string == null) {
    return string;
  }

  const words = splitWords(string, options);

  return map(words, (word) => toWordCase(word, true, options)).join(" ");
}
