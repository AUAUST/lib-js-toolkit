/**
 * Formats the number as its method does, throwing the same errors.
 *
 * @native equal Number.prototype.toLocaleString
 */
export function toLocaleString(
  value: number,
  locales?: Intl.LocalesArgument,
  options?: Intl.NumberFormatOptions,
): string {
  return value.toLocaleString(locales, options);
}
