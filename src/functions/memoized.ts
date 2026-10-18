import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type { Callee } from "@auaust/toolkit/types";
import type { Key } from "readline";

export type MemoizedFn<
  Key = any,
  Return = any,
  Implementation extends (...args: any[]) => Return = (
    ...args: any[]
  ) => Return,
> = Implementation & {
  /** Clears every cached value. */
  clear(): void;

  /** The number of cached entries. */
  get size(): number;

  /** Returns a cached value without computing it. */
  value(key: Key): Return | undefined;

  /** Returns whether a value is cached for the given key. */
  has(key: Key): boolean;

  /** Deletes the cached value for the given key. */
  delete(key: Key): boolean;
};

export function memoized<
  Key,
  Return,
  Arguments extends readonly [Key, ...any[]],
  This = any,
>(
  implementation: Callee<Return, Arguments, This>,
): MemoizedFn<Key, Return, (this: This, ...args: Arguments) => Return>;
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
