import type { CounterOptions } from "#modules/string/types/CounterOptions";

/**
 * Options of `decrement`.
 */
export interface DecrementOptions extends CounterOptions {
  /**
   * Safe integer subtracted from the counter; a negative one increments.
   * Defaults to `1`.
   */
  readonly decrement?: number;
}
