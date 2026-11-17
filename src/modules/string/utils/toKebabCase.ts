import { joinCasedWords } from "#modules/string/internals/joinCasedWords";
import { resolveOptions } from "#modules/string/internals/resolveOptions";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { KebabCased } from "#modules/string/types/KebabCased";
import type { Maybe } from "#types/Maybe";
import type { OptionsOrField } from "#types/OptionsOrField";

/**
 * Converts the string to kebab-case, splitting through `splitWords`, which
 * drops characters that are neither letters, marks nor digits, and casing words
 * following `locale`; a nullish string returns `undefined`.
 *
 * `locale` may be passed alone in place of the options.
 *
 * @shorthand kebab
 * @root
 */
export function toKebabCase<Value extends string>(
  string: Value,
): KebabCased<Value>;
export function toKebabCase(
  string: string,
  options?: OptionsOrField<CasingOptions, "locale">,
): string;
export function toKebabCase(
  string: null | undefined,
  options?: OptionsOrField<CasingOptions, "locale">,
): undefined;
export function toKebabCase(
  string: Maybe<string>,
  options?: OptionsOrField<CasingOptions, "locale">,
): string | undefined;
export function toKebabCase(
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

  return joinCasedWords(words, "-", options);
}
