import { toLocaleLowerCase } from "#modules/string/utils/toLocaleLowerCase";
import { toLocaleUpperCase } from "#modules/string/utils/toLocaleUpperCase";
import type { LocaleOptions } from "#modules/string/types/LocaleOptions";

/**
 * Lowercases the word following `locale`, then uppercases its first code point
 * when `capitalized` is set.
 */
export function toWordCase(
  word: string,
  capitalized: boolean,
  options: LocaleOptions,
): string {
  const lowered = toLocaleLowerCase(word, options);

  if (!capitalized) {
    return lowered;
  }

  const [first = ""] = lowered;

  return toLocaleUpperCase(first, options) + lowered.slice(first.length);
}
