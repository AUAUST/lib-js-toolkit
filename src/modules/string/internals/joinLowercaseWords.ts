import { map } from "#modules/array/utils/map";
import { toWordCase } from "#modules/string/internals/toWordCase";
import type { LocaleOptions } from "#modules/string/types/LocaleOptions";

/**
 * Lowercases each word following `locale` and joins them with `delimiter`.
 */
export function joinLowercaseWords(
  words: readonly string[],
  delimiter: string,
  options: LocaleOptions,
): string {
  return map(words, (word) => toWordCase(word, false, options)).join(delimiter);
}
