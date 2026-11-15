import type { LocaleOptions } from "#modules/string/types/LocaleOptions";

/**
 * Options of `splitWords` and the case converters built on it.
 */
export interface CasingOptions extends LocaleOptions {
  /**
   * Whether to remove accents with `unaccent` before splitting.
   */
  readonly unaccent?: boolean;
}
