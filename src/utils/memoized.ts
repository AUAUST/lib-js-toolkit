import { isCallable } from "#modules/function/utils/isCallable";
import { assign } from "#modules/object/utils/assign";
import { defineGetter } from "#modules/object/utils/defineGetter";
import { identity } from "#utils/identity";
import { resolveCallable } from "#utils/resolveCallable";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallSignature } from "#types/CallSignature";
import type { CachedOptions, CacheResolver, KeyResolver } from "#utils/cached";

export type Memoized<
  Callback extends CacheResolver = CacheResolver,
  Key = CallParameters<Callback>[0],
> = CallSignature<Callback> & {
  /**
   * Calls the memoized function without overriding its resolver's receiver.
   */
  call(
    thisArg: undefined,
    ...args: CallParameters<Callback>
  ): CallReturnType<Callback>;

  /**
   * Resolves a key without computing or caching a value.
   */
  keyFor(this: void, ...args: CallParameters<Callback>): Key;

  /**
   * Clears every cached value.
   */
  clear(): void;

  /**
   * The number of cached entries.
   */
  get size(): number;

  /**
   * Returns a cached value without computing it.
   */
  value(key: Key): CallReturnType<Callback> | undefined;

  /**
   * Returns whether a value is cached for the given key.
   */
  has(key: Key): boolean;

  /**
   * Deletes the cached value for the given key.
   */
  delete(key: Key): boolean;
};

export type MemoizedOptions<
  Callback extends Callee = Callee,
  Key = unknown,
> = Pick<CachedOptions<Callback, Key>, "resolveKey">;

/**
 * Caches results by the first argument or a custom resolved key.
 * Returning undefined from a key resolver bypasses cache reads and writes.
 * Caller receivers are ignored; callable resolvers retain their holders.
 * Both resolvers are resolved once at setup.
 */
export function memoized<Callback extends CacheResolver, Key>(
  callback: Callback,
  resolveKey: KeyResolver<Callback, Key>,
): Memoized<Callback, Key>;
export function memoized<
  Callback extends CacheResolver,
  Key = CallParameters<Callback>[0],
>(
  callback: Callback,
  options?: MemoizedOptions<Callback, Key>,
): Memoized<Callback, Key>;
export function memoized(
  callback: CacheResolver,
  options: MemoizedOptions | Callee = {},
): Memoized {
  const resolveKey = isCallable(options) ? options : options.resolveKey;

  const hasKeyResolver = isCallable(resolveKey);

  const keyFor = hasKeyResolver
    ? resolveCallable(resolveKey, resolveKey)
    : identity.bind(undefined);

  const resolveValue = resolveCallable(callback, callback);

  const cache = new Map<unknown, unknown>();

  function accessor(...args: unknown[]): unknown {
    const key = keyFor(...args);

    if (hasKeyResolver && key === undefined) {
      return resolveValue(...args);
    }

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = resolveValue(...args);

    cache.set(key, result);

    return result;
  }

  function clear(): void {
    cache.clear();
  }

  function value(key: unknown): unknown {
    return cache.get(key);
  }

  function has(key: unknown): boolean {
    return cache.has(key);
  }

  function deleteEntry(key: unknown): boolean {
    return cache.delete(key);
  }

  defineGetter(accessor, "size", () => cache.size);

  return assign(accessor, {
    keyFor,
    clear,
    value,
    has,
    delete: deleteEntry,
  }) as Memoized;
}
