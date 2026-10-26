import { identity } from "@auaust/toolkit/identity";
import { isCallable } from "@auaust/toolkit/isCallable";
import { isContainer } from "@auaust/toolkit/isContainer";
import { assign } from "@auaust/toolkit/object";
import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type { Callable } from "@auaust/toolkit/protocols/callable";
import type {
  Callee,
  CallParameters,
  CallReturnType,
  CallSignature,
  Fn,
} from "@auaust/toolkit/types";

export type CacheResolver<
  Return = any,
  Arguments extends readonly any[] = any[],
> = Callable<Return, Arguments> | Fn<Return, Arguments, void>;

export type KeyResolver<Callback extends Callee, Key> = Callee<
  Key,
  CallParameters<Callback>,
  Callback
>;

export type Cached<
  Callback extends CacheResolver,
  Key = CallParameters<Callback>[0],
> = CallSignature<Callback> & {
  call(
    thisArg: void,
    ...args: CallParameters<Callback>
  ): CallReturnType<Callback>;

  /**
   * Resolves a key without computing or caching a value.
   * Callable resolvers use their holders as receivers; caller receivers are ignored.
   */
  keyFor: (this: void, ...args: CallParameters<Callback>) => Key;

  /**
   * Clears the cached values.
   */
  clear(): void;

  /**
   * Returns the cached entry for the resolved key only if it already exists.
   * Does not compute the value if it doesn't exist.
   */
  value(key: Key): CallReturnType<Callback> | undefined;

  /**
   * Returns true if the cache contains an entry for the resolved key.
   */
  has(key: Key): boolean;

  /**
   * Deletes the cached entry for the resolved key.
   */
  delete(key: Key): boolean;
};

export type CachedOptions<Callback extends Callee = Callee, Key = unknown> = {
  /**
   * Resolves the cache key from all callback arguments.
   * Callable objects use their holders as receivers. Resolved once at setup.
   * Returning undefined bypasses cache reads and writes.
   */
  resolveKey?: KeyResolver<Callback, Key>;

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
 * A key resolver can override the first argument; undefined bypasses the cache.
 * Passing a key resolver directly enables primitive caching. In options,
 * `resolveKey` leaves `cachePrimitives` false by default.
 */
export function cached<Callback extends CacheResolver, Key>(
  callback: Callback,
  resolveKey: KeyResolver<Callback, Key>,
): Cached<Callback, Key>;
export function cached<
  Callback extends CacheResolver,
  Key = CallParameters<Callback>[0],
>(
  callback: Callback,
  options?: CachedOptions<Callback, Key>,
): Cached<Callback, Key>;
export function cached(
  callback: Callee,
  options: CachedOptions | Callee = {},
): Cached<Callee> {
  const { cachePrimitives = false, resolveKey } = isCallable(options)
    ? {
        cachePrimitives: true,
        resolveKey: options,
      }
    : options;

  const primitiveCache = cachePrimitives ? new Map<any, unknown>() : undefined;

  const hasKeyResolver = isCallable(resolveKey);

  const keyFor = hasKeyResolver
    ? resolveCallable(resolveKey, resolveKey)
    : identity.bind(undefined);

  const resolveValue = resolveCallable(callback, callback);

  let objectCache = new WeakMap<any, unknown>();

  function accessor(this: void, ...args: unknown[]): unknown {
    const key = keyFor(...args);

    if (hasKeyResolver && key === undefined) {
      return resolveValue(...args);
    }

    const isPrimitive = !isContainer(key);

    if (isPrimitive && !primitiveCache) {
      return resolveValue(...args);
    }

    const cache = isPrimitive ? primitiveCache! : objectCache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = resolveValue(...args);

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
    keyFor,
    clear,
    value,
    has,
    delete: deleteEntry,
  }) as Cached<Callee>;
}
