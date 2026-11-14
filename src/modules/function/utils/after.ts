import { toDelay } from "#modules/function/internals/toDelay";
import { apply } from "#modules/function/utils/apply";
import type { AsyncCallee } from "#types/AsyncCallee";

/**
 * Calls the callback after the delay in milliseconds, forwarding arguments and
 * `this`. Resolves with its result or rejects with its thrown error or rejection
 * reason.
 *
 * @throws {TypeError} synchronously when the delay is not a number
 * @throws {RangeError} synchronously when the delay is negative
 */
export function after<Result, Arguments extends readonly any[], This>(
  this: This,
  callback: AsyncCallee<Result, Arguments, This>,
  delay: number,
  ...args: Arguments
): Promise<Result> {
  const wait = toDelay(delay, "after delay");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(apply.call(this, callback, args));
      } catch (error) {
        reject(error);
      }
    }, wait);
  });
}
