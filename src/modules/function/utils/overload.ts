/* eslint-disable prefer-rest-params -- allows #113's allocation-free dispatch */
import { isArray } from "#modules/array/guards/isArray";
import { isFunction } from "#modules/function/guards/isFunction";
import { otherObjectsLeaf, typeParents } from "#modules/guard/constants";
import { assign } from "#modules/object/utils/assign";
import { create } from "#modules/object/utils/create";
import { entries } from "#modules/object/utils/entries";
import { hasOwn } from "#modules/object/utils/hasOwn";
import { keys } from "#modules/object/utils/keys";
import { values } from "#modules/object/utils/values";
import type { TypeLeaf } from "#types/TypeLeaf";
import type { TypeLeafTypes } from "#types/TypeLeafTypes";
import type { TypeName } from "#types/TypeName";
import type { UnionToIntersection } from "#types/UnionToIntersection";

type TypeNode = keyof typeof typeParents;

/**
 * A key of the traps object of `overload`: a type name, or `default`, an
 * alias of `unknown`.
 */
export type TrapName = TypeName | "default";

type DeepestTrap<
  Node extends TypeNode,
  Names extends PropertyKey,
> = Node extends Names
  ? Node
  : Node extends "unknown"
    ? "default" extends Names
      ? "default"
      : never
    : (typeof typeParents)[Node] extends TypeNode
      ? DeepestTrap<(typeof typeParents)[Node], Names>
      : never;

type Reach<Name extends TrapName, Names extends PropertyKey> = {
  [Leaf in TypeLeaf]: Name extends DeepestTrap<Leaf, Names>
    ? TypeLeafTypes[Leaf]
    : never;
}[TypeLeaf];

type AnyCallable =
  | ((...args: never) => unknown)
  | (abstract new (...args: never) => unknown);

type Matches<
  Value,
  Leaf extends TypeLeaf,
> = Leaf extends typeof otherObjectsLeaf
  ? Value extends object
    ? Value extends readonly unknown[] | AnyCallable
      ? false
      : true
    : object extends Value
      ? true
      : false
  : Leaf extends "function"
    ? Value extends AnyCallable
      ? true
      : AnyCallable extends Value
        ? true
        : false
    : Value extends TypeLeafTypes[Leaf]
      ? true
      : TypeLeafTypes[Leaf] extends Value
        ? true
        : false;

type LeavesOf<Value> = Value extends unknown
  ? {
      [Leaf in TypeLeaf]: Matches<Value, Leaf> extends true ? Leaf : never;
    }[TypeLeaf]
  : never;

type ReachedTraps<Traps, Value> = DeepestTrap<LeavesOf<Value>, keyof Traps> &
  keyof Traps;

type TrapShape<Input> = [Input] extends [never]
  ? never
  : {
      trap(value: Input, ...args: any[]): unknown;
    }["trap"];

/**
 * Constrains each trap of `overload` to receive the values it is reached by: an
 * unreachable group trap and `default` beside `unknown` are `never`. Keys that
 * are no trap name are left out.
 */
export type OverloadTraps<Traps> = {
  [Name in keyof Traps & TrapName]: TrapShape<Reach<Name, keyof Traps>>;
};

type TrapParameters<Trap> = Trap extends (...args: infer Parameters) => unknown
  ? Parameters
  : never;

type TrapInput<Traps, Name extends keyof Traps> = Name extends TrapName
  ? (TrapParameters<Traps[Name]> extends readonly []
      ? unknown
      : TrapParameters<Traps[Name]>[0]) &
      Reach<Name, keyof Traps>
  : never;

type TrapRest<Traps, Name extends keyof Traps> = TrapParameters<
  Traps[Name]
> extends readonly [unknown?, ...infer Rest]
  ? Rest
  : [];

type TrapTuple<Traps, Name extends keyof Traps> = Name extends unknown
  ? readonly [TrapInput<Traps, Name>, ...TrapRest<Traps, Name>]
  : never;

/**
 * The argument lists an overloaded function accepts: one trap's parameters,
 * or a first argument any trap accepts followed by arguments checked by
 * `OverloadCheckedArguments`.
 */
export type OverloadArguments<Traps> =
  | TrapTuple<Traps, keyof Traps>
  | readonly [OverloadInput<Traps>, ...unknown[]];

type FailingTraps<
  Traps,
  Names extends keyof Traps,
  Rest,
> = Names extends unknown
  ? Rest extends readonly [...TrapRest<Traps, Names>, ...unknown[]]
    ? never
    : Names
  : never;

type FittingTraps<
  Traps,
  Names extends keyof Traps,
  Rest,
> = Names extends unknown
  ? Rest extends TrapRest<Traps, Names>
    ? Names
    : never
  : never;

/**
 * The arguments themselves when every trap their first argument can reach accepts
 * the remaining ones, ignoring those past its parameters, and at least one trap
 * takes them all; `never` otherwise.
 */
export type OverloadCheckedArguments<Traps, Args> = Args extends readonly [
  infer Value,
  ...infer Rest,
]
  ? [FailingTraps<Traps, ReachedTraps<Traps, Value>, Rest>] extends [never]
    ? [FittingTraps<Traps, ReachedTraps<Traps, Value>, Rest>] extends [never]
      ? never
      : Args
    : never
  : never;

type TrapReturn<Trap> = Trap extends (...args: never) => infer Return
  ? Return
  : never;

/**
 * The return types of the traps the first of the arguments can reach.
 */
export type OverloadReturn<Traps, Args> = Args extends readonly [
  infer Value,
  ...unknown[],
]
  ? TrapReturn<Traps[ReachedTraps<Traps, Value>]>
  : never;

/**
 * The first arguments an overloaded function accepts: the union of its
 * traps' inputs.
 */
export type OverloadInput<Traps> = {
  [Name in keyof Traps]: TrapInput<Traps, Name>;
}[keyof Traps];

type OverloadThis<Traps> = UnionToIntersection<
  { [Name in keyof Traps]: ThisParameterType<Traps[Name]> }[keyof Traps]
>;

/**
 * A function dispatching each call to the trap of its first argument's type.
 */
export interface Overloaded<Traps> {
  <const Args extends OverloadArguments<Traps>>(
    this: OverloadThis<Traps>,
    ...args: Args & OverloadCheckedArguments<Traps, Args>
  ): OverloadReturn<Traps, Args>;

  /**
   * Returns `true` when the function has a trap for the value's type, narrowing
   * it to the accepted first arguments. Like the call, it checks the type only:
   * a trap narrowing its input narrows the value without checking it.
   */
  handles(value: unknown): value is OverloadInput<Traps>;
}

type TrapFn = (this: unknown, ...args: unknown[]) => unknown;

type TrapNodes = Partial<Record<TypeNode, TrapFn>>;

type TrapTable = Partial<Record<TypeLeaf, TrapFn>>;

function nameOf(node: TypeNode) {
  return node === otherObjectsLeaf ? "object" : node;
}

function isTrapName(name: string): name is TrapName {
  return (
    name === "default" ||
    (name !== otherObjectsLeaf && hasOwn(typeParents, name))
  );
}

function typeLeafOf(value: unknown): TypeLeaf {
  const type = typeof value;

  if (type !== "object") {
    return type;
  }

  if (value === null) {
    return "null";
  }

  return isArray(value) ? "array" : otherObjectsLeaf;
}

function typeLeaves() {
  const parents = new Set<TypeNode | null>(values(typeParents));

  return keys(typeParents).filter((node): node is TypeLeaf => {
    return !parents.has(node);
  });
}

function collectTraps(traps: Readonly<Record<string, unknown>>) {
  const nodes = create<TrapNodes>(null);

  for (const [name, trap] of entries(traps)) {
    if (!isTrapName(name)) {
      throw new TypeError(
        `Expected a type name or "default", received "${name}".`,
      );
    }

    if (!isFunction(trap)) {
      throw new TypeError(`Expected the "${name}" trap to be a function.`);
    }

    const node = name === "default" ? "unknown" : name;

    if (nodes[node] !== undefined) {
      throw new TypeError(`Expected "default" or "unknown", received both.`);
    }

    nodes[node] = trap;
  }

  return nodes;
}

function deepestTrap(leaf: TypeLeaf, nodes: TrapNodes) {
  for (
    let node: TypeNode | null = leaf;
    node !== null;
    node = typeParents[node]
  ) {
    const trap = nodes[node];

    if (trap !== undefined) {
      return {
        node,
        trap,
      };
    }
  }
}

function resolveTraps(traps: Readonly<Record<string, unknown>>): TrapTable {
  const nodes = collectTraps(traps);
  const table = create<TrapTable>(null);
  const reached = new Set<string>();

  for (const leaf of typeLeaves()) {
    const deepest = deepestTrap(leaf, nodes);

    if (deepest === undefined) {
      continue;
    }

    table[leaf] = deepest.trap;

    reached.add(deepest.node);
  }

  for (const node of keys(nodes)) {
    if (!reached.has(node)) {
      throw new TypeError(
        `Expected the "${node}" trap to be reachable, but deeper traps cover all its types.`,
      );
    }
  }

  return table;
}

/**
 * Builds a function calling the trap of its first argument's type, forwarding
 * `this` and every argument and returning the trap's result. A value reaches the
 * trap of the deepest defined type name on its leaf's chain of the type tree;
 * `default` aliases `unknown`.
 *
 * A trap narrowing its input, such as `string: (value: "a") => …`, narrows the
 * accepted arguments at the type level only: dispatch is by type, so any string
 * reaches it at runtime.
 *
 * @throws {TypeError} at definition, on a key that is no type name or `default`,
 * a trap that is no function, `default` beside `unknown`, or a group trap every
 * type of which has a deeper trap.
 * @throws {TypeError} at call, on a first argument whose type has no trap.
 */
export function overload<
  Names extends TrapName,
  Traps extends OverloadTraps<Record<Names, unknown>>,
>(traps: Traps & Record<Names, unknown>): Overloaded<Traps>;
export function overload(traps: Readonly<Record<string, unknown>>): unknown {
  const table = resolveTraps(traps);
  // @debt Joins the trap names with native `Array.prototype.join` instead of the array module's `join`, which the #317 sweep adopted elsewhere.
  const names = keys(traps).join(", ");

  function overloaded(this: unknown): unknown {
    const leaf = typeLeafOf(arguments[0]);
    const trap = table[leaf];

    if (trap === undefined) {
      throw new TypeError(
        `Expected a value handled by ${names}, received ${nameOf(leaf)}.`,
      );
    }

    return Reflect.apply(trap, this, arguments);
  }

  function handles(value: unknown) {
    return table[typeLeafOf(value)] !== undefined;
  }

  return assign(overloaded, {
    handles,
  });
}
