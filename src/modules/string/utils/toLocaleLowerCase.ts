import type { LocaleOptions } from "#modules/string/types/LocaleOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the string in lowercase following `locale`, locale-independently when it
 * is omitted rather than with the host's locale; nullish input is returned as is.
 *
 * @native nullsafe String.prototype.toLocaleLowerCase
 */
export function toLocaleLowerCase(
  string: string,
  options?: LocaleOptions,
): string;
export function toLocaleLowerCase<Value extends null | undefined>(
  string: Value,
  options?: LocaleOptions,
): Value;
export function toLocaleLowerCase(
  string: Maybe<string>,
  options?: LocaleOptions,
): Maybe<string>;
export function toLocaleLowerCase(
  string: Maybe<string>,
  options: LocaleOptions = {},
): Maybe<string> {
  if (string == null) {
    return string;
  }

  return options.locale == null
    ? string.toLowerCase()
    : string.toLocaleLowerCase(options.locale);
}
