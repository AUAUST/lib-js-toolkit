import { join } from "#modules/array/utils/join";
import { map } from "#modules/array/utils/map";
import { resolveOptions } from "#modules/string/internals/resolveOptions";
import { splitWords } from "#modules/string/utils/splitWords";
import { toWordCase } from "#modules/string/utils/toWordCase";
import type { CamelCasedWords } from "#modules/string/types/CamelCasedWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { OptionsOrField } from "#modules/string/types/OptionsOrField";
import type { SplitWords } from "#modules/string/types/SplitWords";
import type { Joined } from "#types/Joined";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to camelCase, splitting through `splitWords`, which drops
 * characters that are neither letters, marks nor digits, and casing words
 * following `locale`; a nullish string returns `undefined`.
 *
 * `locale` may be passed alone in place of the options.
 *
 * @shorthand camel
 * @root
 */
export function toCamelCase<Value extends string>(
  string: Value,
): Joined<CamelCasedWords<SplitWords<Value>>, "">;
export function toCamelCase(
  string: string,
  options?: OptionsOrField<CasingOptions, "locale">,
): string;
export function toCamelCase(
  string: null | undefined,
  options?: OptionsOrField<CasingOptions, "locale">,
): undefined;
export function toCamelCase(
  string: Maybe<string>,
  options?: OptionsOrField<CasingOptions, "locale">,
): string | undefined;
export function toCamelCase(
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

  const words = splitWords(string, options);

  return join(
    map(words, (word, index) => {
      return toWordCase(word, { ...options, capitalized: index > 0 });
    }),
    "",
  );
}
