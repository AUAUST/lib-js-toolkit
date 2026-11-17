import { join } from "#modules/array/utils/join";
import { map } from "#modules/array/utils/map";
import { toWordCase } from "#modules/string/utils/toWordCase";
import type { WordCaseOptions } from "#modules/string/types/WordCaseOptions";

/**
 * Cases each word through `toWordCase` with `options` and joins them
 * with `delimiter`.
 */
export function joinCasedWords(
  words: readonly string[],
  delimiter: string,
  options: WordCaseOptions,
): string {
  return join(
    map(words, (word) => {
      return toWordCase(word, options);
    }),
    delimiter,
  );
}
