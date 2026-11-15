import type { otherObjectsLeaf, typeParents } from "#modules/guard/constants";
import type { UnknownFn } from "#types/UnknownFn";

type TypeParents = typeof typeParents;

type TypeNode = keyof TypeParents;

type TypeLeaf = Exclude<TypeNode, TypeParents[TypeNode]>;

type TypeChain<Node extends TypeNode> =
  | Node
  | (TypeParents[Node] extends TypeNode ? TypeChain<TypeParents[Node]> : never);

type CoveringLeaves<Types extends Record<TypeLeaf, unknown>> = Types;

type LeafTypes = CoveringLeaves<
  Record<typeof otherObjectsLeaf, object> & {
    array: readonly unknown[];
    bigint: bigint;
    boolean: boolean;
    function: UnknownFn;
    null: null;
    number: number;
    string: string;
    symbol: symbol;
    undefined: undefined;
  }
>;

/**
 * Maps each type name of the type tree to the type it matches: its leaves' union,
 * or `unknown` for the root.
 */
export type TypeNames = {
  [
    Name in Exclude<TypeNode, typeof otherObjectsLeaf>
  ]: TypeParents[Name] extends null
    ? unknown
    : {
        [Leaf in TypeLeaf]: Name extends TypeChain<Leaf>
          ? LeafTypes[Leaf]
          : never;
      }[TypeLeaf];
};
