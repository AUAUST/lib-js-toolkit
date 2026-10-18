import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type { Callee, Fn, Signature } from "@auaust/toolkit/types";
import type { Key } from "readline";

export type Memoized<Key = any, Callback extends Fn = Fn> = Callback & {
  /** Clears every cached value. */
  clear(): void;

  /** The number of cached entries. */
  get size(): number;

  /** Returns a cached value without computing it. */
  value(key: Key): ReturnType<Callback> | undefined;

  /** Returns whether a value is cached for the given key. */
  has(key: Key): boolean;

  /** Deletes the cached value for the given key. */
  delete(key: Key): boolean;
};

export function memoized<Key, Callable extends Callee>(
  callback: Callee,
): Memoized<Key, Signature<Callable>>;
export function memoized(callback: Callee): Memoized {
  const cache = new Map();

  const resolve = resolveCallable(callback);

  const accessor = function memoized(this: any, key: Key, ...args: any[]) {
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const value = resolve.call(this, key, ...args);

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

  return accessor as Memoized;
}
