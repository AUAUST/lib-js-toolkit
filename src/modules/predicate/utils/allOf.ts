import { toFunction } from "#modules/function/utils/toFunction";
import type { Guarded } from "#modules/predicate/types/Guarded";
import type { Callee } from "#types/Callee";
import type { UnionToIntersection } from "#types/UnionToIntersection";

/**
 * Returns `function conjoined`, telling whether every predicate accepts its
 * arguments, stopping at the first that rejects them; with no predicate, it
 * accepts everything. Each predicate receives the same `this` and arguments, in
 * order, and a callable predicate is resolved once, here.
 */
export function allOf<
  const Guards extends readonly [
    (this: any, candidate: any, ...args: any[]) => candidate is any,
    ...((this: any, candidate: any, ...args: any[]) => candidate is any)[],
  ],
>(
  ...predicates: Guards
): (
  candidate: unknown,
  ...args: unknown[]
) => candidate is UnionToIntersection<Guarded<Guards[number]>>;
export function allOf(
  ...predicates: readonly Callee[]
): (...args: unknown[]) => boolean;
export function allOf(
  ...predicates: readonly Callee[]
): (...args: unknown[]) => boolean {
  const resolved = predicates.map((predicate) => toFunction(predicate));

  return function conjoined(this: unknown, ...args: unknown[]): boolean {
    return resolved.every((predicate) => Reflect.apply(predicate, this, args));
  };
}
