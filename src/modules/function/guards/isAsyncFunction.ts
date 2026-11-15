import type { AsyncFn } from "#types/AsyncFn";

/**
 * Reads the `Object.prototype.toString` tag, so functions from other realms match
 * and functions merely returning the same result do not.
 */
export function isAsyncFunction(candidate: unknown): candidate is AsyncFn {
  return Object.prototype.toString.call(candidate) === "[object AsyncFunction]";
}
