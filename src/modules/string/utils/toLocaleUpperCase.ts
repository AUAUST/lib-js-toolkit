import { resolveOptions } from "#modules/string/internals/resolveOptions";
import type { LocaleOptions } from "#modules/string/types/LocaleOptions";
import type { OptionsOrField } from "#modules/string/types/OptionsOrField";
import type { Maybe } from "#types/Maybe";

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
  const options = resolveOptions<LocaleOptions, "locale">(
    optionsOrField,
    "locale",
  );

  if (string != null) {
    return options.locale == null
      ? string.toUpperCase()
      : string.toLocaleUpperCase(options.locale);
  }
}
