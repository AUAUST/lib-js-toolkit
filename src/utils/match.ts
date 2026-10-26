import { call } from "@auaust/toolkit/call";
import { isArray } from "@auaust/toolkit/isArray";
import { isCallable } from "@auaust/toolkit/isCallable";
import { isString } from "@auaust/toolkit/isString";
import { isNaN } from "@auaust/toolkit/math";
import { value, type ResolvedValue } from "@auaust/toolkit/value";
import type { Callee } from "@auaust/toolkit/types";

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
  let target: unknown, cases: readonly Case<unknown, unknown>[];

  if (
    arguments.length <= 2 &&
    isArray(targetOrCases) &&
    !isArray(casesOrFallback)
  ) {
    target = undefined;
    cases = targetOrCases as readonly Case<unknown, unknown>[];
    fallback = casesOrFallback;
  } else {
    target = targetOrCases;
    cases = casesOrFallback!;
  }

  for (let [predicates, result] of cases) {
    if (!isArray(predicates)) {
      predicates = [predicates];
    }

    for (const predicate of <unknown[]>predicates) {
      if (isCallable(predicate) && call(predicate, target)) {
        return value(result);
      }

      if (predicate === target) {
        return value(result);
      }

      if (
        predicate instanceof RegExp &&
        isString(target) &&
        predicate.test(target)
      ) {
        return value(result);
      }

      if (isNaN(predicate) && isNaN(target)) {
        return value(result);
      }
    }
  }

  return value(fallback)!;
}
