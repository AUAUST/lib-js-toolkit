/**
 * Limits of `inspect`, keeping its output short.
 */
export interface InspectOptions {
  /**
   * Nesting levels expanded before a value collapses to its type and size;
   * defaults to 2.
   */
  readonly depth?: number;
  /**
   * Items shown per array, collection or key list before `...skipped N`;
   * defaults to 10.
   */
  readonly maxItems?: number;
  /**
   * Characters shown per string before `..." (+N chars)`; defaults to 100.
   */
  readonly maxStringLength?: number;
}
