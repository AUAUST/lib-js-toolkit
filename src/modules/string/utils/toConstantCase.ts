import { resolveOptions } from "#modules/string/internals/resolveOptions";
import { toDelimitedCase } from "#modules/string/utils/toDelimitedCase";
import { toLocaleUpperCase } from "#modules/string/utils/toLocaleUpperCase";
import type { CasingOptions } from "#modules/string/types/CasingOptions";
import type { ConstantCased } from "#modules/string/types/ConstantCased";
import type { Maybe } from "#types/Maybe";
import type { OptionsOrField } from "#types/OptionsOrField";

/**
 * Converts the string to CONSTANT_CASE, splitting through `splitWords`, which
 * drops characters that are neither letters, marks nor digits, and uppercasing
 * following `locale`; a nullish string returns `undefined`.
 *
 * `locale` may be passed alone in place of the options.
 *
 * @shorthand screaming
 * @root
 */
export function toConstantCase<Value extends string>(
  string: Value,
): ConstantCased<Value>;
export function toConstantCase(
  string: string,
  options?: OptionsOrField<CasingOptions, "locale">,
): string;
export function toConstantCase(
  string: null | undefined,
  options?: OptionsOrField<CasingOptions, "locale">,
): undefined;
export function toConstantCase(
  string: Maybe<string>,
  options?: OptionsOrField<CasingOptions, "locale">,
): string | undefined;
export function toConstantCase(
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

  return toLocaleUpperCase(toDelimitedCase(string, "_", options), options);
}
