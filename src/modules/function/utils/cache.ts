import { isCallable } from "#modules/function/guards/isCallable";
import { toFunction } from "#modules/function/utils/toFunction";
import { identity } from "#modules/general/utils/identity";
import { isContainer } from "#modules/guard/guards/isContainer";
import { assign } from "#modules/object/utils/assign";
import type { Callable } from "#modules/protocol/types/Callable";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallSignature } from "#types/CallSignature";
import type { Fn } from "#types/Fn";

export type CacheResolver<
  Return = any,
  Arguments extends readonly any[] = any[],
> =
  | Callable<Return, Arguments>
  | Fn<Return, Arguments, void>;

export type KeyResolver<Closure extends Callee, Key> = Callee<
  Key,
  CallParameters<Closure>,
  Closure
>;

export type Cached<
  Closure extends CacheResolver,
  Key = CallParameters<Closure>[0],
> = CallSignature<Closure> & {
  call(
    thisArg: undefined,
    ...args: CallParameters<Closure>
  ): CallReturnType<Closure>;

  /**
   * Resolves a key without computing or caching a value. Callable resolvers use
   * their holders as receivers; caller receivers are ignored.
   */
  keyFor(this: void, ...args: CallParameters<Closure>): Key;

  /**
   * Clears the cached values.
   */
  clear(): void;

  /**
   * Returns the cached entry for the resolved key only if it already exists.
   * Does not compute the value if it doesn't exist.
   */
  value(key: Key): CallReturnType<Closure> | undefined;

  /**
   * Returns true if the cache contains an entry for the resolved key.
   */
  has(key: Key): boolean;

  /**
   * Deletes the cached entry for the resolved key.
   */
  delete(key: Key): boolean;
};

export interface CachedOptions<Closure extends Callee = Callee, Key = unknown> {
  /**
   * Resolves the cache key from all closure arguments. Callable objects use their
   * holders as receivers. Resolved once at setup. Returning undefined bypasses
   * cache reads and writes.
   */
  resolveKey?: KeyResolver<Closure, Key> | undefined;

  /**
   * Caches primitive keys in a strong Map when true. These entries remain until
   * explicitly deleted or cleared.
   *
   * @default false
   */
  cachePrimitives?: boolean | undefined;
}

/**
 * Caches results by the first argument, weakly for object and function keys. A
 * key resolver can override the first argument; undefined bypasses the cache.
 * Passing a key resolver directly enables primitive caching. In options,
 * `resolveKey` leaves `cachePrimitives` false by default.
 */
export function cache<Closure extends CacheResolver, Key>(
  closure: Closure,
  resolveKey: KeyResolver<Closure, Key>,
): Cached<Closure, Key>;
export function cache<
  Closure extends CacheResolver,
  Key = CallParameters<Closure>[0],
>(
  closure: Closure,
  options?: CachedOptions<Closure, Key>,
): Cached<Closure, Key>;
export function cache(
  closure: Callee,
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
    ? toFunction(resolveKey, resolveKey)
    : identity.bind(undefined);

  const resolveValue = toFunction(closure, closure);

  let objectCache = new WeakMap<any, unknown>();

  function cached(this: void, ...args: unknown[]): unknown {
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
    return (
      ((isContainer(key) && objectCache.has(key)) ||
        primitiveCache?.has(key)) ??
      false
    );
  }

  function deleteEntry(key: unknown): boolean {
    return (
      (isContainer(key) && objectCache.delete(key)) ||
      (primitiveCache?.delete(key) ?? false)
    );
  }

  return assign(cached, {
    keyFor,
    clear,
    value,
    has,
    delete: deleteEntry,
  });
}
