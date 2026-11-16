import type { LocaleOptions } from "#modules/string/types/LocaleOptions";
import type { Maybe } from "#types/Maybe";

/**
 * Returns the string in lowercase following `locale`, locale-independently
 * when it is omitted rather than with the host's locale; a nullish string
 * returns `undefined`.
 *
 * @native nullsafe String.prototype.toLocaleLowerCase
 */
export function toLocaleLowerCase(
  string: string,
  options?: LocaleOptions,
): string;
export function toLocaleLowerCase(
  string: null | undefined,
  options?: LocaleOptions,
): undefined;
export function toLocaleLowerCase(
  string: Maybe<string>,
  options?: LocaleOptions,
): string | undefined;
export function toLocaleLowerCase(
  string: Maybe<string>,
  options: LocaleOptions = {},
): string | undefined {
  if (string != null) {
    return options.locale == null
      ? string.toLowerCase()
      : string.toLocaleLowerCase(options.locale);
  }
}
