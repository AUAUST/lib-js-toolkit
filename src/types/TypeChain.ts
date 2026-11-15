import type { typeParents } from "#modules/guard/constants";

type TypeParents = typeof typeParents;

/**
 * The given node of the type tree and all its ancestors, up to the root.
 */
export type TypeChain<Node extends keyof TypeParents> =
  | Node
  | (TypeParents[Node] extends keyof TypeParents
      ? TypeChain<TypeParents[Node]>
      : never);
