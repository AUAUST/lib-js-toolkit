import { resolveOptions } from "#modules/string/internals/resolveOptions";
import type { LocaleOptions } from "#modules/string/types/LocaleOptions";
import type { OptionsOrField } from "#modules/string/types/OptionsOrField";
import type { Maybe } from "#types/Maybe";

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
  const options = resolveOptions<LocaleOptions, "locale">(
    optionsOrField,
    "locale",
  );

  if (string != null) {
    return options.locale == null
      ? string.toLowerCase()
      : string.toLocaleLowerCase(options.locale);
  }
}
