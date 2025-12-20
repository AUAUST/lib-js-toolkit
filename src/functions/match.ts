import { value, type ResolvedValue, type Value } from "./value";

type Case<T, R> =
  | readonly [(value: T) => unknown, Value<R>]
  | readonly [unknown[], Value<R>]
  | readonly [unknown, Value<R>];

type CaseResult<C> = C extends readonly [any, infer R]
  ? ResolvedValue<R>
  : never;

type CasesResult<Cases extends readonly unknown[]> = CaseResult<Cases[number]>;

export function match<
  T,
  Cases extends readonly Case<T, any>[],
  Fallback = undefined
>(
  cases: Cases,
  target: T,
  fallback?: Fallback
): CasesResult<Cases> | ResolvedValue<Fallback> {
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

  // @ts-expect-error
  return value(fallback)!;
}
