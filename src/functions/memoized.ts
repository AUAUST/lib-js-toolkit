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

export function memoized<Key, Result, Arguments extends any[], This = any>(
  implementation: (this: This, key: Key, ...args: Arguments) => Result,
): MemoizedFn<
  Key,
  Result,
  (this: This, key: Key, ...args: Arguments) => Result
> {
  const cache = new Map<Key, Result>();

  const accessor = function (this: This, key: Key, ...args: Arguments): Result {
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const value = implementation.call(this, key, ...args);

    cache.set(key, value);

    return value;
  };

  accessor.clear = () => cache.clear();

  Object.defineProperty(accessor, "size", {
    get: () => cache.size,
  });

  accessor.value = (key: Key): Result | undefined => cache.get(key);

  accessor.has = (key: Key): boolean => cache.has(key);

  accessor.delete = (key: Key): boolean => cache.delete(key);

  return accessor as MemoizedFn<
    Key,
    Result,
    (this: This, key: Key, ...args: Arguments) => Result
  >;
}
