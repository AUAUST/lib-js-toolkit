/**
 * Returns `true` for any value which supports containing custom,
 * own properties. This includes all objects and functions.
 */
export function isContainer(candidate: unknown): candidate is object {
  return (
    (typeof candidate === "object" && candidate !== null) ||
    typeof candidate === "function"
  );
}
