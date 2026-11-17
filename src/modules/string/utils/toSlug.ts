import { joinCasedWords } from "#modules/string/internals/joinCasedWords";
import { resolveOptions } from "#modules/string/internals/resolveOptions";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { LowercaseJoinedWords } from "#modules/string/types/LowercaseJoinedWords";
import type { Maybe } from "#types/Maybe";
import type { OptionsOrField } from "#types/OptionsOrField";

/**
 * Converts the string to a URL slug: words split through `splitWords`, accents
 * removed through `unaccent` unless `unaccent` is `false`, lowercased following
 * `locale`, joined with `-` and normalized to NFC, so canonically equivalent
 * strings give the same slug. A nullish string returns `undefined`.
 *
 * `locale` may be passed alone in place of the options.
 *
 * @shorthand slug
 * @root
 */
export function toSlug<Value extends string>(
  string: Value,
): LowercaseJoinedWords<Value, "-">;
export function toSlug(
  string: string,
  options?: OptionsOrField<CasingOptions, "locale">,
): string;
export function toSlug(
  string: null | undefined,
  options?: OptionsOrField<CasingOptions, "locale">,
): undefined;
export function toSlug(
  string: Maybe<string>,
  options?: OptionsOrField<CasingOptions, "locale">,
): string | undefined;
export function toSlug(
  string: Maybe<string>,
  optionsOrField?: OptionsOrField<CasingOptions, "locale">,
): string | undefined {
  if (string == null) {
    return;
  }

  const options = resolveOptions<CasingOptions, "locale">(
    optionsOrField,
    "locale",
  );

  const casing = { ...options, unaccent: options.unaccent ?? true };

  return joinCasedWords(splitWords(string, casing), "-", casing).normalize(
    "NFC",
  );
}
