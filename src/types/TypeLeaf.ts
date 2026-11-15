import type { typeParents } from "#modules/guard/constants";

type TypeParents = typeof typeParents;

/**
 * A leaf of the type tree: a node no other node has as parent. Leaves
 * partition every value.
 */
export type TypeLeaf = Exclude<
  keyof TypeParents,
  TypeParents[keyof TypeParents]
>;
