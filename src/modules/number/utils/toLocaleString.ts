/**
 * Formats the number as its method does.
 *
 * @throws {RangeError} when a locale or an option is invalid.
 * @native equal Number.prototype.toLocaleString
 */
export function toLocaleString(
  value: number,
  locales?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions,
): string {
  return value.toLocaleString(locales, options);
}
