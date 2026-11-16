import { map } from "#modules/array/utils/map";
import { toWordCase } from "#modules/string/internals/toWordCase";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to Title Case, splitting through `splitWords`, which drops
 * characters that are neither letters, marks nor digits,, then capitalizing
 * each word following `locale` and joining them with spaces; a nullish string
 * returns `undefined`.
 *
 * @shorthand title
 * @root
 */
export function toTitleCase(string: string, options?: CasingOptions): string;
export function toTitleCase(
  string: null | undefined,
  options?: CasingOptions,
): undefined;
export function toTitleCase(
  string: Maybe<string>,
  options?: CasingOptions,
): string | undefined;
export function toTitleCase(
  string: Maybe<string>,
  options: CasingOptions = {},
): string | undefined {
  if (string == null) {
    return;
  }

  const words = splitWords(string, options);

  return map(words, (word) => toWordCase(word, true, options)).join(" ");
}
