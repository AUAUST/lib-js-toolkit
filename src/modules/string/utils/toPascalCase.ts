import { joinCapitalizedWords } from "#modules/string/internals/joinCapitalizedWords";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CapitalizedJoinedWords } from "#modules/string/types/CapitalizedJoinedWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Converts the string to PascalCase, splitting through `splitWords`, which
 * drops characters that are neither letters, marks nor digits, and casing words
 * following `locale`; a nullish string returns `undefined`.
 *
 * @shorthand pascal
 * @root
 */
export function toPascalCase<Value extends string>(
  string: Value,
): CapitalizedJoinedWords<Value, "">;
export function toPascalCase(string: string, options?: CasingOptions): string;
export function toPascalCase(
  string: null | undefined,
  options?: CasingOptions,
): undefined;
export function toPascalCase(
  string: Maybe<string>,
  options?: CasingOptions,
): string | undefined;
export function toPascalCase(
  string: Maybe<string>,
  options: CasingOptions = {},
): string | undefined {
  if (string != null) {
    return joinCapitalizedWords(splitWords(string, options), "", options);
  }
}
