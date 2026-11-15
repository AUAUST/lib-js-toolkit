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
 * with `-`. `unaccent` defaults to `true`. Nullish input is returned as is.
 *
 * @shorthand slug
 */
export function toSlug(string: string, options?: CasingOptions): string;
export function toSlug<Value extends null | undefined>(
  string: Value,
  options?: CasingOptions,
): Value;
export function toSlug(
  string: Maybe<string>,
  options?: CasingOptions,
): Maybe<string>;
export function toSlug(
  string: Maybe<string>,
  options: CasingOptions = {},
): Maybe<string> {
  if (string == null) {
    return string;
  }

  const casing = { ...options, unaccent: options.unaccent ?? true };

  const words = map(splitWords(string, casing), (word) => {
    return word.split(nonAlphanumericRunPattern).join("");
  });

  const kept = filter(words, (word) => word !== "");

  return joinLowercaseWords(kept, "-", casing);
}
