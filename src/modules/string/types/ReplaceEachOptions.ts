/**
 * Options of `replaceEach`.
 */
export interface ReplaceEachOptions {
  /**
   * Replaces every occurrence of a substring rather than the first; a regex
   * follows its own `g` flag. Defaults to `false`.
   */
  readonly all?: boolean;
}
