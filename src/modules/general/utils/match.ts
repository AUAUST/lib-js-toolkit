import { isArray } from "#modules/array/guards/isArray";
import { matchesPredicate } from "#modules/general/internals/matchesPredicate";
import { resolveMatchArguments } from "#modules/general/internals/resolveMatchArguments";
import { value, type ResolvedValue } from "#modules/general/utils/value";
import type { Callee } from "#types/Callee";

type Predicate<T> = Callee<unknown, [value: T]>;

type FunctionalCase<T, V> =
  | readonly [readonly Predicate<T>[], Callee<V, [never?: undefined]>]
  | readonly [Predicate<T>, Callee<V, [never?: undefined]>];

type LiteralCase<V> = readonly [unknown, V] | readonly [readonly unknown[], V];

type Case<T, V> = FunctionalCase<T, V> | LiteralCase<V>;

type CaseResult<C> = C extends readonly [any, infer V]
  ? ResolvedValue<V>
  : never;

type CasesResult<Cases extends readonly unknown[]> = CaseResult<Cases[number]>;

export function match<
  V,
  Cases extends readonly FunctionalCase<undefined, V>[],
  Fallback = undefined,
>(
  cases: Cases,
  fallback?: Fallback,
): CasesResult<Cases> | ResolvedValue<Fallback>;
export function match<
  V,
  Cases extends readonly LiteralCase<V>[],
  Fallback = undefined,
>(
  cases: Cases,
  fallback?: Fallback,
): CasesResult<Cases> | ResolvedValue<Fallback>;
export function match<
  T,
  Cases extends readonly Case<T, any>[],
  Fallback = undefined,
>(
  target: T,
  cases: Cases,
  fallback?: Fallback,
): CasesResult<Cases> | ResolvedValue<Fallback>;
export function match(
  targetOrCases: unknown,
  casesOrFallback?: readonly Case<unknown, unknown>[],
  fallback?: unknown,
): unknown {
  const [target, cases, resolvedFallback] = resolveMatchArguments<
    readonly Case<unknown, unknown>[]
  >(arguments.length, targetOrCases, casesOrFallback, fallback);

  for (const [predicates, result] of cases) {
    for (const predicate of isArray(predicates) ? predicates : [predicates]) {
      if (matchesPredicate(predicate, target)) {
        return value(result);
      }
    }
  }

  return value(resolvedFallback);
}
