import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type { Callee } from "@auaust/toolkit/types";
import type { Key } from "readline";

export type MemoizedFn<
  Key = any,
  Result = any,
  Implementation extends (...args: any[]) => Result = (
    ...args: any[]
  ) => Result,
> = Implementation & {
  /** Clears every cached value. */
  clear(): void;

  /** The number of cached entries. */
  get size(): number;

  /** Returns a cached value without computing it. */
  value(key: Key): Result | undefined;

  /** Returns whether a value is cached for the given key. */
  has(key: Key): boolean;

  /** Deletes the cached value for the given key. */
  delete(key: Key): boolean;
};

export function memoized<
  Key,
  Result,
  Arguments extends [Key, ...any[]],
  This = any,
>(
  implementation: Callee<Arguments, Result, This>,
): MemoizedFn<Key, Result, (this: This, ...args: Arguments) => Result>;
export function memoized(implementation: Callee): MemoizedFn {
  const cache = new Map();

  const callback = resolveCallable(implementation);

  const accessor = function (this: any, key: Key, ...args: any[]) {
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const value = callback.call(this, key, ...args);

    cache.set(key, value);

    return value;
  };

  accessor.clear = () => cache.clear();

  Object.defineProperty(accessor, "size", {
    get: () => cache.size,
  });

  accessor.value = (key: any) => cache.get(key);

  accessor.has = (key: any): boolean => cache.has(key);

  accessor.delete = (key: any): boolean => cache.delete(key);

  return accessor as MemoizedFn;
}
