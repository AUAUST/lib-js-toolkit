import { resolveOptions } from "#modules/string/internals/resolveOptions";
import type { LocaleOptions } from "#modules/string/types/LocaleOptions";
import type { Maybe } from "#types/Maybe";
import type { OptionsOrField } from "#types/OptionsOrField";

/**
 * Returns the string in uppercase following `locale`, locale-independently
 * when it is omitted rather than with the host's locale; a nullish string
 * returns `undefined`.
 *
 * `locale` may be passed alone in place of the options.
 *
 * @native nullsafe String.prototype.toLocaleUpperCase
 */
export function toLocaleUpperCase(
  string: string,
  options?: OptionsOrField<LocaleOptions, "locale">,
): string;
export function toLocaleUpperCase(
  string: null | undefined,
  options?: OptionsOrField<LocaleOptions, "locale">,
): undefined;
export function toLocaleUpperCase(
  string: Maybe<string>,
  options?: OptionsOrField<LocaleOptions, "locale">,
): string | undefined;
export function toLocaleUpperCase(
  string: Maybe<string>,
  optionsOrField?: OptionsOrField<LocaleOptions, "locale">,
): string | undefined {
  if (string == null) {
    return;
  }

  const {
    locale,
  } = resolveOptions<LocaleOptions, "locale">(optionsOrField, "locale");

  return locale == null
    ? string.toUpperCase()
    : string.toLocaleUpperCase(locale);
}
