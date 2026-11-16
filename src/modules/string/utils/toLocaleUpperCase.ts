import type { LocaleOptions } from "#modules/string/types/LocaleOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the string in uppercase following `locale`, locale-independently
 * when it is omitted rather than with the host's locale; a nullish string
 * returns `undefined`.
 *
 * @native nullsafe String.prototype.toLocaleUpperCase
 */
export function toLocaleUpperCase(
  string: string,
  options?: LocaleOptions,
): string;
export function toLocaleUpperCase(
  string: null | undefined,
  options?: LocaleOptions,
): undefined;
export function toLocaleUpperCase(
  string: Maybe<string>,
  options?: LocaleOptions,
): string | undefined;
export function toLocaleUpperCase(
  string: Maybe<string>,
  options: LocaleOptions = {},
): string | undefined {
  if (string != null) {
    return options.locale == null
      ? string.toUpperCase()
      : string.toLocaleUpperCase(options.locale);
  }
}
