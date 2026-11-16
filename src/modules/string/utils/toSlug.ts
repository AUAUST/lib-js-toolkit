import { filter } from "#modules/array/utils/filter";
import { map } from "#modules/array/utils/map";
import { nonAlphanumericRunPattern } from "#modules/string/constants";
import { joinLowercaseWords } from "#modules/string/internals/joinLowercaseWords";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to a URL slug: words split through `splitWords`, stripped
 * of everything but letters and digits, lowercased following `locale` and joined
 * with `-`. `unaccent` defaults to `true`. A nullish string returns `undefined`.
 *
 * @shorthand slug
 */
export function toSlug(string: string, options?: CasingOptions): string;
export function toSlug(
  string: null | undefined,
  options?: CasingOptions,
): undefined;
export function toSlug(
  string: Maybe<string>,
  options?: CasingOptions,
): string | undefined;
export function toSlug(
  string: Maybe<string>,
  options: CasingOptions = {},
): string | undefined {
  if (string == null) {
    return;
  }

  const casing = { ...options, unaccent: options.unaccent ?? true };

  const words = map(splitWords(string, casing), (word) => {
    return word.split(nonAlphanumericRunPattern).join("");
  });

  const kept = filter(words, (word) => word !== "");

  return joinLowercaseWords(kept, "-", casing);
}
