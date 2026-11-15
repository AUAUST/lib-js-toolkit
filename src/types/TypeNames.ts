import type { Primitive } from "#types/Primitive";
import type { UnknownFn } from "#types/UnknownFn";

/**
 * Maps each type name the type-dispatched helpers accept to the type it matches.
 */
export interface TypeNames {
  bigint: bigint;
  boolean: boolean;
  container: object;
  function: UnknownFn;
  null: null;
  nullish: null | undefined;
  number: number;
  object: object;
  primitive: Primitive;
  string: string;
  symbol: symbol;
  undefined: undefined;
}
