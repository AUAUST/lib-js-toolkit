import { after } from "#modules/function/utils/after";
import { noop } from "#modules/general/utils/noop";

/**
 * Resolves after the delay in milliseconds.
 *
 * @throws {TypeError} synchronously when the delay is not a number
 * @throws {RangeError} synchronously when the delay is negative
 */
export function sleep(delay: number): Promise<void> {
  return after(noop, delay);
}
