import type { otherObjectsLeaf } from "#modules/guard/constants";
import type { TypeLeaf } from "#types/TypeLeaf";
import type { UnknownFn } from "#types/UnknownFn";

type CoveringLeaves<Types extends Record<TypeLeaf, unknown>> = Types;

/**
 * Maps each leaf of the type tree to the type of its values.
 */
export type TypeLeafTypes = CoveringLeaves<
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
