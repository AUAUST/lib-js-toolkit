import { value, type ResolvedValue } from "./value";

type Predicate<T> = (value: T) => unknown;

type FunctionalCase<T, V> =
  | readonly [readonly Predicate<T>[], (never?: undefined) => V]
  | readonly [Predicate<T>, (never?: undefined) => V];

type LiteralCase<V> = readonly [unknown, V] | readonly [readonly unknown[], V];

type Case<T, V> = FunctionalCase<T, V> | LiteralCase<V>;

type CaseResult<C> = C extends readonly [any, infer V]
  ? ResolvedValue<V>
  : never;

type CasesResult<Cases extends readonly unknown[]> = CaseResult<Cases[number]>;

export function match<
  V,
  Cases extends readonly FunctionalCase<undefined, V>[],
  Fallback = undefined
>(
  cases: Cases,
  fallback?: Fallback
): CasesResult<Cases> | ResolvedValue<Fallback>;
export function match<
  V,
  Cases extends readonly LiteralCase<V>[],
  Fallback = undefined
>(
  cases: Cases,
  fallback?: Fallback
): CasesResult<Cases> | ResolvedValue<Fallback>;
export function match<
  T,
  Cases extends readonly Case<T, any>[],
  Fallback = undefined
>(
  target: T,
  cases: Cases,
  fallback?: Fallback
): CasesResult<Cases> | ResolvedValue<Fallback>;
export function match(
  targetOrCases: unknown,
  casesOrFallback?: readonly Case<unknown, unknown>[],
  fallback?: unknown
): unknown {
  let target: unknown, cases: readonly Case<unknown, unknown>[];

  if (
    arguments.length <= 2 &&
    Array.isArray(targetOrCases) &&
    !Array.isArray(casesOrFallback)
  ) {
    target = undefined;
    cases = targetOrCases as readonly Case<unknown, unknown>[];
    fallback = casesOrFallback;
  } else {
    target = targetOrCases;
    cases = casesOrFallback!;
  }

  for (let [predicates, result] of cases) {
    if (!Array.isArray(predicates)) {
      predicates = [predicates];
    }

    for (const predicate of <unknown[]>predicates) {
      if (typeof predicate === "function" && predicate(target)) {
        return value(result);
      }

      if (predicate === target) {
        return value(result);
      }

      if (
        predicate instanceof RegExp &&
        typeof target === "string" &&
        predicate.test(target)
      ) {
        return value(result);
      }

      if (Number.isNaN(predicate) && Number.isNaN(target)) {
        return value(result);
      }
    }
  }

  return value(fallback)!;
}
