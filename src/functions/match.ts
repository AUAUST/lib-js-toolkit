import { value, type ResolvedValue, type Value } from "./value";

type Predicate<T> = (value: T) => unknown;

type FunctionalCase<T, R> =
  | readonly [Predicate<T>, Value<R>]
  | readonly [Predicate<T>[], Value<R>];

type Case<T, R> =
  | FunctionalCase<T, R>
  | readonly [unknown[], Value<R>]
  | readonly [unknown, Value<R>];

type CaseResult<C> = C extends readonly [any, infer R]
  ? ResolvedValue<R>
  : never;

type CasesResult<Cases extends readonly unknown[]> = CaseResult<Cases[number]>;

export function match<
  Cases extends readonly FunctionalCase<undefined, any>[],
  Fallback = undefined
>(
  cases: Cases,
  fallback?: Fallback
): CasesResult<Cases> | ResolvedValue<Fallback>;
export function match<
  T = undefined,
  Cases extends readonly Case<T, any>[] = readonly Case<T, any>[],
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
