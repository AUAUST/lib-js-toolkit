/**
 * Options `increment` and `decrement` share.
 */
export interface CounterOptions {
  /**
   * Inserted between the string and a counter it adds. Defaults to `""`.
   */
  readonly separator?: string;
  /**
   * Minimum width of the counter, padded with `filler`; the counter never narrows
   * below its current width. Defaults to `0`.
   */
  readonly pad?: number | false;
  /**
   * Fills the counter up to its width. Defaults to `"0"`.
   */
  readonly filler?: string;
}
