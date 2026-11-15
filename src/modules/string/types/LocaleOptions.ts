/**
 * Options of locale-aware string helpers.
 */
export interface LocaleOptions {
  /**
   * BCP 47 tags of the locale to follow; locale-independent when omitted.
   */
  readonly locale?: Intl.LocalesArgument;
}
