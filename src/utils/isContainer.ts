/**
 * Returns `true` for any value which supports containing custom,
 * own properties. This includes all objects and functions.
 */
export function isContainer(input: unknown): input is object {
  return (
    (typeof input === "object" && input !== null) || typeof input === "function"
  );
}
