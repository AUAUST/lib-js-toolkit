export function isFunction(
  candidate: unknown,
): candidate is (...args: unknown[]) => unknown {
  return typeof candidate === "function";
}
