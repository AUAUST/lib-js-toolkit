/** Returns `true` for non-null objects, excluding functions. */
export function isObject(input: unknown): input is object {
  return typeof input === "object" && input !== null;
}
