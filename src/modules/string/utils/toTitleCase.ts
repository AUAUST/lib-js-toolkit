import { joinCasedWords } from "#modules/string/internals/joinCasedWords";
import { resolveOptions } from "#modules/string/internals/resolveOptions";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { TitleCased } from "#modules/string/types/TitleCased";
import type { Maybe } from "#types/Maybe";
import type { OptionsOrField } from "#types/OptionsOrField";

/**
 * Converts the string to Title Case, splitting through `splitWords`, which drops
 * characters that are neither letters, marks nor digits, then capitalizing
 * each word following `locale` and joining them with spaces; a nullish string
 * returns `undefined`.
 *
 * `locale` may be passed alone in place of the options.
 *
 * @shorthand title
 * @root
 */
export function toTitleCase<Value extends string>(
  string: Value,
): TitleCased<Value>;
export function toTitleCase(
  string: string,
  options?: OptionsOrField<CasingOptions, "locale">,
): string;
export function toTitleCase(
  string: null | undefined,
  options?: OptionsOrField<CasingOptions, "locale">,
): undefined;
export function toTitleCase(
  string: Maybe<string>,
  options?: OptionsOrField<CasingOptions, "locale">,
): string | undefined;
export function toTitleCase(
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

  return joinCasedWords(splitWords(string, options), " ", {
    ...options,
    capitalized: true,
  });
}
