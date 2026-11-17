import { joinCasedWords } from "#modules/string/internals/joinCasedWords";
import { resolveOptions } from "#modules/string/internals/resolveOptions";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { SnakeCased } from "#modules/string/types/SnakeCased";
import type { Maybe } from "#types/Maybe";
import type { OptionsOrField } from "#types/OptionsOrField";

/**
 * Converts the string to snake_case, splitting through `splitWords`, which
 * drops characters that are neither letters, marks nor digits, and casing words
 * following `locale`; a nullish string returns `undefined`.
 *
 * `locale` may be passed alone in place of the options.
 *
 * @shorthand snake
 * @root
 */
export function toSnakeCase<Value extends string>(
  string: Value,
): SnakeCased<Value>;
export function toSnakeCase(
  string: string,
  options?: OptionsOrField<CasingOptions, "locale">,
): string;
export function toSnakeCase(
  string: null | undefined,
  options?: OptionsOrField<CasingOptions, "locale">,
): undefined;
export function toSnakeCase(
  string: Maybe<string>,
  options?: OptionsOrField<CasingOptions, "locale">,
): string | undefined;
export function toSnakeCase(
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

  return joinCasedWords(splitWords(string, options), "_", options);
}
