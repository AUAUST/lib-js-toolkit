import { isFunction } from "@auaust/primitive-kit/functions";
import { identity } from "./identity";

export function transform<T extends Record<string, any>>(source: T): T;
export function transform<
  S extends Record<string, any>,
  M extends Partial<Record<keyof S, string>>,
>(
  source: S,
  map: M,
): {
  [K in keyof S as (K extends keyof M ? M[K] : K) & PropertyKey]: S[K];
};
export function transform<
  S extends Record<string, any>,
  M extends (key: keyof S) => PropertyKey,
>(source: S, map: M): Record<ReturnType<M>, S[keyof S]>;
export function transform<
  S extends Record<string, any>,
  M extends Partial<Record<keyof S, PropertyKey>> | undefined,
  F extends (value: S[keyof S]) => any,
>(
  source: S,
  map?: M,
  transform?: F,
): {
  [K in keyof S as (M extends Record<keyof S, PropertyKey> ? M[K] : K) &
    PropertyKey]: ReturnType<F> extends infer R ? R : S[K];
};
export function transform(
  source: Record<string, any>,
  map?: Record<string, string> | ((key: string) => PropertyKey),
  transform?: (value: any) => any,
): Record<string, any>;
export function transform(
  source: Record<string, any>,
  map?: Record<string, string> | ((key: string) => PropertyKey),
  transform?: (value: any) => any,
) {
  if (!source || typeof source !== "object") {
    return source;
  }

  const transformer = isFunction(transform) ? transform : identity;

  if (isFunction(map)) {
    for (const key in source) {
      const newKey = map(key);
      const newValue = transformer(source[key]);

      if (newKey !== key) {
        delete source[key];
      }

      source[newKey as keyof typeof source] = newValue;
    }
  } else if (map) {
    for (const key in source) {
      const newKey = map[key] ?? key;
      const newValue = transformer(source[key]);

      if (newKey !== key) {
        delete source[key];
      }

      source[newKey] = newValue;
    }
  } else {
    for (const key in source) {
      source[key] = transformer(source[key]);
    }
  }

  return source;
}
