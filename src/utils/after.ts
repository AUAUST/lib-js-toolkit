import { apply } from "#utils/apply";
import type { AsyncCallee } from "#types/AsyncCallee";

/**
 * Calls the callback after the delay in milliseconds, forwarding arguments and `this`.
 * Resolves with its result or rejects with its thrown error or rejection reason.
 */
export function after<Result, Arguments extends readonly any[], This>(
  this: This,
  callback: AsyncCallee<Result, Arguments, This>,
  delay: number,
  ...args: Arguments
): Promise<Result> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(apply.call(this, callback, args));
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
}
