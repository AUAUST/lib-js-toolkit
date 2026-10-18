import { isContainer } from "@auaust/toolkit/isContainer";
import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type {
  Callee,
  CallParameters,
  CallReturnType,
  CallSignature,
} from "@auaust/toolkit/types";

export type Cached<Callback extends Callee> = CallSignature<Callback> & {
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
  value(key: CallParameters<Callback>[0]): CallReturnType<Callback> | undefined;

  /**
   * Returns true if the cache contains an entry for the given key.
   * Returns false if the entry has been garbage collected.
   */
  has(key: CallParameters<Callback>[0]): boolean;

  /**
   * Deletes the cached entry for the given key.
   */
  delete(key: CallParameters<Callback>[0]): boolean;
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

export function cached<Callback extends Callee>(
  callback: Callback,
  options?: CachedOptions,
): Cached<Callback>;
export function cached(
  callback: Callee,
  options: CachedOptions = {},
): Cached<Callee> {
  const { weakRefs = true, cachePrimitives = false } = options;

  const resolve = resolveCallable(callback);

  const cache = new Map<unknown, unknown>();

  const accessor = function cached(this: unknown, ...args: unknown[]): unknown {
    const key = args[0];

    if (cache.has(key)) {
      let value = cache.get(key);

      if (value instanceof WeakRef) {
        value = value.deref();

        if (value === undefined) {
          cache.delete(key);
        } else {
          return value;
        }
      } else {
        return value;
      }
    }

    const value = resolve.call(this, ...args);

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

  function clear(): void {
    cache.clear();
  }

  Object.defineProperty(accessor, "size", {
    get: () => cache.size,
  });

  function value(key: unknown): unknown {
    if (!cache.has(key)) {
      return undefined;
    }

    const value = cache.get(key);

    if (value instanceof WeakRef) {
      return value.deref();
    }

    return value;
  }

  function has(key: unknown): boolean {
    if (!cache.has(key)) {
      return false;
    }

    const value = cache.get(key);

    if (value instanceof WeakRef && value.deref() === undefined) {
      cache.delete(key);

      return false;
    }

    return true;
  }

  function deleteEntry(key: unknown): boolean {
    return cache.delete(key);
  }

  return Object.assign(accessor, {
    clear,
    value,
    has,
    delete: deleteEntry,
  }) as Cached<Callee>;
}
