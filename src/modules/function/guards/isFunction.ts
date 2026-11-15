import type { UnknownFn } from "#types/UnknownFn";

export function isFunction(candidate: unknown): candidate is UnknownFn {
  return typeof candidate === "function";
}
