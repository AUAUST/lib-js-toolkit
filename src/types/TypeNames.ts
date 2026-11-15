import type { otherObjectsLeaf, typeParents } from "#modules/guard/constants";
import type { TypeChain } from "#types/TypeChain";
import type { TypeLeaf } from "#types/TypeLeaf";
import type { TypeLeafTypes } from "#types/TypeLeafTypes";

type TypeParents = typeof typeParents;

/**
 * Maps each type name of the type tree to the type it matches: its leaves' union,
 * or `unknown` for the root.
 */
export type TypeNames = {
  [
    Name in Exclude<keyof TypeParents, typeof otherObjectsLeaf>
  ]: TypeParents[Name] extends null
    ? unknown
    : {
        [Leaf in TypeLeaf]: Name extends TypeChain<Leaf>
          ? TypeLeafTypes[Leaf]
          : never;
      }[TypeLeaf];
};
