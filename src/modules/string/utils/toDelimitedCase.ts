import { join } from "#modules/array/utils/join";
import { resolveOptions } from "#modules/string/internals/resolveOptions";
import { splitWords } from "#modules/string/utils/splitWords";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { DelimitedCased } from "#modules/string/types/DelimitedCased";
import type { Maybe } from "#types/Maybe";
import type { OptionsOrField } from "#types/OptionsOrField";

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
): DelimitedCased<Value, Delimiter>;
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
  if (string == null) {
    return;
  }

  const options = resolveOptions<CasingOptions, "locale">(
    optionsOrField,
    "locale",
  );

  return join(splitWords(string, options), delimiter);
}
