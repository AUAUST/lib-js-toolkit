/** Returns `true` for non-null objects, excluding functions. */
export function isObject(candidate: unknown): candidate is object {
  return typeof candidate === "object" && candidate !== null;
}
