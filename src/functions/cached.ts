import { isContainer } from "@auaust/toolkit/isContainer";

export type CachedFn<Key, Result, Implementation> = Implementation & {
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
  value(key: Key): Result | undefined;

  /**
   * Returns true if the cache contains an entry for the given key.
   * Returns false if the entry has been garbage collected.
   */
  has(key: Key): boolean;

  /**
   * Deletes the cached entry for the given key.
   */
  delete(key: Key): boolean;
};

export type CachedOptions = {
  /**
   * If true, caches objects using WeakRef to allow garbage collection.
   *
   * @default true
   */
  weakRefs?: boolean;

  /**
   * If true, caches primitive values as well. This may lead to memory leaks.
   *
   * @default false
   */
  cachePrimitives?: boolean;
};

export function cached<Key, Result, Arguments extends any[], This = any>(
  implementation: (this: This, key: Key, ...args: Arguments) => Result,
  options: CachedOptions = {},
): CachedFn<Key, Result, (this: This, key: Key, ...args: Arguments) => Result> {
  const { weakRefs = true, cachePrimitives = false } = options;

  const cache = new Map<Key, WeakRef<Result & WeakKey> | Result>();

  const accessor = function (this: This, key: Key, ...args: Arguments): Result {
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

    const value = implementation.call(this, key, ...args);

    if (isContainer(value)) {
      if (weakRefs) {
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

  accessor.value = (key: Key): Result | undefined => {
    if (!cache.has(key)) {
      return undefined;
    }

    const value = cache.get(key);

    if (value instanceof WeakRef) {
      return value.deref();
    }

    return value;
  };

  accessor.has = (key: Key): boolean => {
    if (!cache.has(key)) {
      return false;
    }

    const value = cache.get(key);

    if (value instanceof WeakRef && value.deref() === undefined) {
      return (cache.delete(key), false);
    }

    return true;
  };

  accessor.delete = (key: Key): boolean => cache.delete(key);

  return <CachedFn<Key, Result, () => any>>accessor;
}
