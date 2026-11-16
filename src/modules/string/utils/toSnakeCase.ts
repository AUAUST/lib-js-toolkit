import { joinLowercaseWords } from "#modules/string/internals/joinLowercaseWords";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to snake_case, splitting through `splitWords`, which
 * drops characters that are neither letters, marks nor digits, and casing words
 * following `locale`; a nullish string returns `undefined`.
 *
 * @shorthand snake
 * @root
 */
export function toSnakeCase(string: string, options?: CasingOptions): string;
export function toSnakeCase(
  string: null | undefined,
  options?: CasingOptions,
): undefined;
export function toSnakeCase(
  string: Maybe<string>,
  options?: CasingOptions,
): string | undefined;
export function toSnakeCase(
  string: Maybe<string>,
  options: CasingOptions = {},
): string | undefined {
  if (string != null) {
    return joinLowercaseWords(splitWords(string, options), "_", options);
  }
}
