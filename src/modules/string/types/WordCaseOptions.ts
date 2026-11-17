import type { LocaleOptions } from "#modules/string/types/LocaleOptions";

/**
 * Options of `toWordCase`.
 */
export interface WordCaseOptions extends LocaleOptions {
  /**
   * Whether to uppercase the first code point after lowercasing; `false`
   * by default.
   */
  readonly capitalized?: boolean;
}
