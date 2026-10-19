import { isContainer } from "@auaust/toolkit/isContainer";
import { assign } from "@auaust/toolkit/object";
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
   * Returns the cached entry for the given key only if it already exists.
   * Does not compute the value if it doesn't exist.
   */
  value(key: CallParameters<Callback>[0]): CallReturnType<Callback> | undefined;

  /**
   * Returns true if the cache contains an entry for the given key.
   */
  has(key: CallParameters<Callback>[0]): boolean;

  /**
   * Deletes the cached entry for the given key.
   */
  delete(key: CallParameters<Callback>[0]): boolean;
};

export type CachedOptions = {
  /**
   * Caches primitive keys in a strong Map when true.
   * These entries remain until explicitly deleted or cleared.
   *
   * @default false
   */
  cachePrimitives?: boolean;
};

/**
 * Caches results by the first argument, weakly for object and function keys.
 * Primitive keys are cached only when `cachePrimitives` is true.
 */
export function cached<Callback extends Callee>(
  callback: Callback,
  options?: CachedOptions,
): Cached<Callback>;
export function cached(
  callback: Callee,
  options: CachedOptions = {},
): Cached<Callee> {
  const { cachePrimitives = false } = options;

  const resolve = resolveCallable(callback);

  const primitiveCache = cachePrimitives ? new Map<any, unknown>() : undefined;

  let objectCache = new WeakMap<any, unknown>();

  function accessor(this: unknown, ...args: unknown[]): unknown {
    const key = args[0];

    const isPrimitive = !isContainer(key);

    if (isPrimitive && !primitiveCache) {
      return resolve.call(this, ...args);
    }

    const cache = isPrimitive ? primitiveCache! : objectCache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = resolve.call(this, ...args);

    cache.set(key, result);

    return result;
  }

  function clear(): void {
    objectCache = new WeakMap();
    primitiveCache?.clear();
  }

  function value(key: unknown): unknown {
    return isContainer(key)
      ? objectCache.get(key)
      : primitiveCache
        ? primitiveCache.get(key)
        : undefined;
  }

  function has(key: unknown): boolean {
    return isContainer(key)
      ? objectCache.has(key)
      : primitiveCache
        ? primitiveCache.has(key)
        : false;
  }

  function deleteEntry(key: unknown): boolean {
    return isContainer(key)
      ? objectCache.delete(key)
      : primitiveCache
        ? primitiveCache.delete(key)
        : false;
  }

  return assign(accessor, {
    clear,
    value,
    has,
    delete: deleteEntry,
  }) as Cached<Callee>;
}
