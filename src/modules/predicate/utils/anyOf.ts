import { toFunction } from "#modules/function/utils/toFunction";
import type { Guarded } from "#modules/predicate/types/Guarded";
import type { Callee } from "#types/Callee";

/**
 * Returns `function disjoined`, telling whether some predicate accepts its
 * arguments, stopping at the first that does; with no predicate, it rejects
 * everything. Each predicate receives the same `this` and arguments, in order,
 * and a callable predicate is resolved once, here.
 */
export function anyOf<
  const Guards extends readonly [
    (this: any, candidate: any, ...args: any[]) => candidate is any,
    ...((this: any, candidate: any, ...args: any[]) => candidate is any)[],
  ],
>(
  ...predicates: Guards
): (
  candidate: unknown,
  ...args: unknown[]
) => candidate is Guarded<Guards[number]>;
export function anyOf(
  ...predicates: readonly Callee[]
): (...args: unknown[]) => boolean;
export function anyOf(
  ...predicates: readonly Callee[]
): (...args: unknown[]) => boolean {
  const resolved = predicates.map((predicate) => toFunction(predicate));

  return function disjoined(this: unknown, ...args: unknown[]): boolean {
    return resolved.some((predicate) => Reflect.apply(predicate, this, args));
  };
}
