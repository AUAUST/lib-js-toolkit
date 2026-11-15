import type { CounterOptions } from "#modules/string/types/CounterOptions";

/**
 * Options of `increment`.
 */
export interface IncrementOptions extends CounterOptions {
  /**
   * Safe integer added to the counter; a negative one decrements. Defaults to `1`.
   */
  readonly increment?: number;
}
