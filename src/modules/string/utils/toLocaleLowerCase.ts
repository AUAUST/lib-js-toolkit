import { resolveOptions } from "#modules/string/internals/resolveOptions";
import type { LocaleOptions } from "#modules/string/types/LocaleOptions";
import type { Maybe } from "#types/Maybe";
import type { OptionsOrField } from "#types/OptionsOrField";

/**
 * Returns the string in lowercase following `locale`, locale-independently
 * when it is omitted rather than with the host's locale; a nullish string
 * returns `undefined`.
 *
 * `locale` may be passed alone in place of the options.
 *
 * @native nullsafe String.prototype.toLocaleLowerCase
 */
export function toLocaleLowerCase(
  string: string,
  options?: OptionsOrField<LocaleOptions, "locale">,
): string;
export function toLocaleLowerCase(
  string: null | undefined,
  options?: OptionsOrField<LocaleOptions, "locale">,
): undefined;
export function toLocaleLowerCase(
  string: Maybe<string>,
  options?: OptionsOrField<LocaleOptions, "locale">,
): string | undefined;
export function toLocaleLowerCase(
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
    ? string.toLowerCase()
    : string.toLocaleLowerCase(locale);
}
