export type CachedFn<K, R, Fn> = Fn & {
  /**
   * Clears the cached values.
   */
  clear(): void;

  /**
   * Returns the number of cached entries.
   */
  get size(): number;

  /**
   * Returns the cached entry for the given key only if it exists and hasn't been garbage collected.
   * Does not compute the value if it doesn't exist.
   */
  value(key: K): R | undefined;

  /**
   * Returns true if the cache contains an entry for the given key.
   * Returns false if the entry has been garbage collected.
   */
  has(key: K): boolean;

  /**
   * Deletes the cached entry for the given key.
   */
  delete(key: K): boolean;
};

export type CachedOptions = {
  /**
   * If true, caches objects using WeakRef to allow garbage collection.
   *
   * @default true
   */
  weakKeys?: boolean;

  /**
   * If true, caches primitive values as well. This may lead to memory leaks.
   *
   * @default false
   */
  cachePrimitives?: boolean;
};

export function cached<K, A extends any[], R, T = any>(
  fn: (this: T, key: K, ...args: A) => R,
  options?: CachedOptions
): CachedFn<K, R, (this: T, key: K, ...args: A) => R> {
  const weakKeys = options?.weakKeys ?? true;
  const cachePrimitives = options?.cachePrimitives ?? false;

  const cache = new Map<K, WeakRef<R & WeakKey> | R>();

  const accessor = function (this: T, key: K, ...args: A): R {
    if (cache.has(key)) {
      let value = cache.get(key);

      if (value instanceof WeakRef) {
        value = value.deref();

        if (value === undefined) {
          cache.delete(key);
        } else {
          return value;
        }

        // Fallthrough to recompute value
      } else {
        return value!;
      }
    }

    const value = fn.call(this, key, ...args);

    if (
      (typeof value === "object" && value !== null) ||
      typeof value === "function"
    ) {
      if (weakKeys) {
        cache.set(key, new WeakRef(value));
      } else {
        cache.set(key, value);
      }
    } else if (cachePrimitives) {
      cache.set(key, value);
    }

    return value;
  };

  accessor.clear = () => cache.clear();

  Object.defineProperty(accessor, "size", {
    get: () => cache.size,
  });

  accessor.value = (key: K): R | undefined => {
    if (!cache.has(key)) {
      return undefined;
    }

    const value = cache.get(key);

    if (value instanceof WeakRef) {
      return value.deref();
    }

    return value;
  };

  accessor.has = (key: K): boolean => {
    if (!cache.has(key)) {
      return false;
    }

    const value = cache.get(key);

    if (value instanceof WeakRef && value.deref() === undefined) {
      return cache.delete(key), false;
    }

    return true;
  };

  accessor.delete = (key: K): boolean => cache.delete(key);

  return <CachedFn<K, R, () => any>>accessor;
}
