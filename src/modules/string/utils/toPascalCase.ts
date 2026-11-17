import { joinCapitalizedWords } from "#modules/string/internals/joinCapitalizedWords";
import { resolveOptions } from "#modules/string/internals/resolveOptions";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CapitalizedJoinedWords } from "#modules/string/types/CapitalizedJoinedWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { OptionsOrField } from "#modules/string/types/OptionsOrField";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to PascalCase, splitting through `splitWords`, which
 * drops characters that are neither letters, marks nor digits, and casing words
 * following `locale`; a nullish string returns `undefined`.
 *
 * `locale` may be passed alone in place of the options.
 *
 * @shorthand pascal
 * @root
 */
export function toPascalCase<Value extends string>(
  string: Value,
): CapitalizedJoinedWords<Value, "">;
export function toPascalCase(
  string: string,
  options?: OptionsOrField<CasingOptions, "locale">,
): string;
export function toPascalCase(
  string: null | undefined,
  options?: OptionsOrField<CasingOptions, "locale">,
): undefined;
export function toPascalCase(
  string: Maybe<string>,
  options?: OptionsOrField<CasingOptions, "locale">,
): string | undefined;
export function toPascalCase(
  string: Maybe<string>,
  optionsOrField?: OptionsOrField<CasingOptions, "locale">,
): string | undefined {
  const options = resolveOptions<CasingOptions, "locale">(
    optionsOrField,
    "locale",
  );

  if (string != null) {
    return joinCapitalizedWords(splitWords(string, options), "", options);
  }
}
