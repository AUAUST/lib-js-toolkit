import type { AsyncFn } from "#types/AsyncFn";

export function isAsyncFunction(candidate: unknown): candidate is AsyncFn {
  return Object.prototype.toString.call(candidate) === "[object AsyncFunction]";
}
