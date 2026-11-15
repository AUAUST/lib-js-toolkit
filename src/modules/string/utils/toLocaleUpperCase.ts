import type { LocaleOptions } from "#modules/string/types/LocaleOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the string in uppercase following `locale`, locale-independently when it
 * is omitted rather than with the host's locale; nullish input is returned as is.
 *
 * @native nullsafe String.prototype.toLocaleUpperCase
 */
export function toLocaleUpperCase(
  string: string,
  options?: LocaleOptions,
): string;
export function toLocaleUpperCase<Value extends null | undefined>(
  string: Value,
  options?: LocaleOptions,
): Value;
export function toLocaleUpperCase(
  string: Maybe<string>,
  options?: LocaleOptions,
): Maybe<string>;
export function toLocaleUpperCase(
  string: Maybe<string>,
  options: LocaleOptions = {},
): Maybe<string> {
  if (string == null) {
    return string;
  }

  return options.locale == null
    ? string.toUpperCase()
    : string.toLocaleUpperCase(options.locale);
}
