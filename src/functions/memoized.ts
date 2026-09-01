export type MemoizedFn<K, R, Fn> = Fn & {
  /** Clears every cached value. */
  clear(): void;

  /** The number of cached entries. */
  get size(): number;

  /** Returns a cached value without computing it. */
  value(key: K): R | undefined;

  /** Returns whether a value is cached for the given key. */
  has(key: K): boolean;

  /** Deletes the cached value for the given key. */
  delete(key: K): boolean;
};

export function memoized<K, A extends any[], R, T = any>(
  fn: (this: T, key: K, ...args: A) => R,
): MemoizedFn<K, R, (this: T, key: K, ...args: A) => R> {
  const cache = new Map<K, R>();

  const accessor = function (this: T, key: K, ...args: A): R {
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const value = fn.call(this, key, ...args);

    cache.set(key, value);

    return value;
  };

  accessor.clear = () => cache.clear();

  Object.defineProperty(accessor, "size", {
    get: () => cache.size,
  });

  accessor.value = (key: K): R | undefined => cache.get(key);

  accessor.has = (key: K): boolean => cache.has(key);

  accessor.delete = (key: K): boolean => cache.delete(key);

  return accessor as MemoizedFn<K, R, (this: T, key: K, ...args: A) => R>;
}
