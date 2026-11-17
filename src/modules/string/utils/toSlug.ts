import { joinLowercaseWords } from "#modules/string/internals/joinLowercaseWords";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { LowercaseJoinedWords } from "#modules/string/types/LowercaseJoinedWords";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to a URL slug: words split through `splitWords`, accents
 * removed through `unaccent` unless `unaccent` is `false`, lowercased following
 * `locale`, joined with `-` and normalized to NFC, so canonically equivalent
 * strings give the same slug. A nullish string returns `undefined`.
 *
 * @shorthand slug
 * @root
 */
export function toSlug<Value extends string>(
  string: Value,
): LowercaseJoinedWords<Value, "-">;
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

  return joinLowercaseWords(splitWords(string, casing), "-", casing).normalize(
    "NFC",
  );
}
