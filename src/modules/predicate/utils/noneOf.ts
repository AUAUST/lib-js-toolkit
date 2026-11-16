import { toFunction } from "#modules/function/utils/toFunction";
import type { Callee } from "#types/Callee";

/**
 * Returns `function excluded`, telling whether no predicate accepts its arguments,
 * stopping at the first that does; with no predicate, it accepts everything. Each
 * predicate receives the same `this` and arguments, in order, and a callable
 * predicate is resolved once, here.
 */
export function noneOf(
  ...predicates: readonly Callee[]
): (...args: unknown[]) => boolean {
  const resolved = predicates.map((predicate) => toFunction(predicate));

  return function excluded(this: unknown, ...args: unknown[]): boolean {
    return !resolved.some((predicate) => Reflect.apply(predicate, this, args));
  };
}
