/**
 * Options of `sort`, `toSorted`, `isSorted` and their by-key forms.
 */
export interface SortOptions {
  /**
   * Orders in descending order in one pass, ties keeping their source order and
   * `undefined` still last.
   */
  readonly reverse?: boolean;
}
