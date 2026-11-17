import { join } from "#modules/array/utils/join";
import { map } from "#modules/array/utils/map";
import { toWordCase } from "#modules/string/utils/toWordCase";
import type { LocaleOptions } from "#modules/string/types/LocaleOptions";

/**
 * Capitalizes each word following `locale` and joins them with `delimiter`.
 */
export function joinCapitalizedWords(
  words: readonly string[],
  delimiter: string,
  options: LocaleOptions,
): string {
  return join(
    map(words, (word) => {
      return toWordCase(word, { ...options, capitalized: true });
    }),
    delimiter,
  );
}
