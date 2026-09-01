import { isFunction } from "@auaust/primitive-kit/functions";
import { constant } from "./constant";
import { identity } from "./identity";

type RecordMappedKey<K, M> = M extends object
  ? K extends keyof M
    ? M[K] extends false
      ? never
      : M[K] extends PropertyKey
      ? M[K]
      : K
    : K
  : K;

type FunctionMappedKey<S, M extends (...args: any[]) => any> =
  | Exclude<ReturnType<M>, boolean | undefined>
  | (true extends ReturnType<M> ? keyof S : never);

export function transform<T extends Record<string, any>>(source: T): T;
export function transform<
  S extends Record<string, any>,
  M extends Partial<Record<keyof S, PropertyKey | boolean>>,
>(
  source: S,
  map: M,
): {
  [K in keyof S as RecordMappedKey<K, M>]: S[K];
};
export function transform<
  S extends Record<string, any>,
  M extends (key: keyof S) => PropertyKey | boolean | undefined,
>(source: S, map: M): Record<FunctionMappedKey<S, M>, S[keyof S]>;
export function transform<
  S extends Record<string, any>,
  M extends Partial<Record<keyof S, PropertyKey | boolean>> | undefined,
  F extends (value: S[keyof S]) => any,
>(
  source: S,
  map?: M,
  transform?: F,
): {
  [K in keyof S as RecordMappedKey<K, M>]: ReturnType<F>;
};
export function transform(
  source: Record<string, any>,
  map?:
    | Record<string, PropertyKey | boolean>
    | ((key: string) => PropertyKey | boolean | undefined),
  transform?: (value: any) => any,
): Record<string, any>;
export function transform(
  source: Record<string, any>,
  map?:
    | Record<string, PropertyKey | boolean>
    | ((key: string) => PropertyKey | boolean | undefined),
  transform?: (value: any) => any,
) {
  if (!source || typeof source !== "object") {
    return source;
  }

  const mapper = isFunction(map)
    ? map
    : map
    ? (key: string) => (key in map ? map[key] : true)
    : constant(true);

  const transformer = isFunction(transform) ? transform : identity;

  for (const key in source) {
    const newKey = mapper(key);

    if (newKey === false || newKey === null || newKey === undefined) {
      delete source[key];
      continue;
    }

    const newValue = transformer(source[key]);

    if (newKey === true) {
      source[key] = newValue;
      continue;
    }

    if (newKey !== key) {
      delete source[key];
    }

    source[newKey as keyof typeof source] = newValue;
  }

  return source;
}
