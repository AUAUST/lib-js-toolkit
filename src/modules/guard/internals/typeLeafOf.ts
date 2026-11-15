import { otherObjectsLeaf } from "#modules/guard/constants";

/**
 * Returns the leaf of the type tree holding the candidate: its `typeof`, with
 * `null` split from objects and arrays from the other objects, which return
 * `otherObjectsLeaf`.
 */
export function typeLeafOf(candidate: unknown) {
  const type = typeof candidate;

  if (type !== "object") {
    return type;
  }

  if (candidate === null) {
    return "null";
  }

  return Array.isArray(candidate) ? "array" : otherObjectsLeaf;
}
