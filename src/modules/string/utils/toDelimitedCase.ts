import { join } from "#modules/array/utils/join";
import { resolveOptions } from "#modules/string/internals/resolveOptions";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { OptionsOrField } from "#modules/string/types/OptionsOrField";
import type { SplitWords } from "#modules/string/types/SplitWords";
import type { Joined } from "#types/Joined";
import type { Maybe } from "#types/Maybe";

/**
 * Splits the string through `splitWords`, dropping characters that are neither
 * letters, marks nor digits, and joins the words with `delimiter`, keeping each
 * word's case; a nullish string returns `undefined`.
 *
 * `locale` may be passed alone in place of the options.
 *
 * @root
 */
export function toDelimitedCase<Value extends string, Delimiter extends string>(
  string: Value,
  delimiter: Delimiter,
): Joined<SplitWords<Value>, Delimiter>;
export function toDelimitedCase(
  string: string,
  delimiter: string,
  options?: OptionsOrField<CasingOptions, "locale">,
): string;
export function toDelimitedCase(
  string: null | undefined,
  delimiter: string,
  options?: OptionsOrField<CasingOptions, "locale">,
): undefined;
export function toDelimitedCase(
  string: Maybe<string>,
  delimiter: string,
  options?: OptionsOrField<CasingOptions, "locale">,
): string | undefined;
export function toDelimitedCase(
  string: Maybe<string>,
  delimiter: string,
  optionsOrField?: OptionsOrField<CasingOptions, "locale">,
): string | undefined {
  const options = resolveOptions<CasingOptions, "locale">(
    optionsOrField,
    "locale",
  );

  if (string != null) {
    return join(splitWords(string, options), delimiter);
  }
}
