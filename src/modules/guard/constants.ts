import { freeze } from "#modules/object/utils/freeze";

/**
 * Key of the leaf holding every object other than arrays, which has no type name.
 */
export const otherObjectsLeaf = "(object)";

/**
 * The type tree: each type name mapped to its parent, the root `unknown` to
 * `null`. Leaves partition every value; groups are unions of leaves.
 */
export const typeParents = freeze({
  unknown: null,
  primitive: "unknown",
  nullish: "primitive",
  undefined: "nullish",
  null: "nullish",
  scalar: "primitive",
  string: "scalar",
  boolean: "scalar",
  numeric: "scalar",
  number: "numeric",
  bigint: "numeric",
  symbol: "primitive",
  container: "unknown",
  function: "container",
  object: "container",
  array: "object",
  [otherObjectsLeaf]: "object",
} as const);
