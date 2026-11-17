import { isCallable } from "#modules/function/guards/isCallable";
import { toFunction } from "#modules/function/utils/toFunction";
import { identity } from "#modules/general/utils/identity";
import { assign } from "#modules/object/utils/assign";
import { defineGetter } from "#modules/object/utils/defineGetter";
import type {
  CachedOptions,
  CacheResolver,
  KeyResolver,
} from "#modules/function/utils/cache";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { CallSignature } from "#types/CallSignature";

// @debt Repeats most members of `Cached` from `cache.ts` (`call`, `keyFor`, `clear`, `value`); a shared base type in the function module could own them.
export type Memoized<
  Closure extends CacheResolver = CacheResolver,
  Key = CallParameters<Closure>[0],
> = CallSignature<Closure> & {
  /**
   * Calls the memoized function without overriding its resolver's receiver.
   */
  call(
    thisArg: undefined,
    ...args: CallParameters<Closure>
  ): CallReturnType<Closure>;

  /**
   * Resolves a key without computing or caching a value.
   */
  keyFor(this: void, ...args: CallParameters<Closure>): Key;

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
  value(key: Key): CallReturnType<Closure> | undefined;

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
  Closure extends Callee = Callee,
  Key = unknown,
> = Pick<CachedOptions<Closure, Key>, "resolveKey">;

/**
 * Caches results by the first argument or a custom resolved key. Returning
 * undefined from a key resolver bypasses cache reads and writes. Caller receivers
 * are ignored; callable resolvers retain their holders. Both resolvers are
 * resolved once at setup.
 */
export function memoize<Closure extends CacheResolver, Key>(
  closure: Closure,
  resolveKey: KeyResolver<Closure, Key>,
): Memoized<Closure, Key>;
export function memoize<
  Closure extends CacheResolver,
  Key = CallParameters<Closure>[0],
>(
  closure: Closure,
  options?: MemoizedOptions<Closure, Key>,
): Memoized<Closure, Key>;
export function memoize(
  closure: CacheResolver,
  options: MemoizedOptions | Callee = {},
): Memoized {
  const resolveKey = isCallable(options) ? options : options.resolveKey;

  const hasKeyResolver = isCallable(resolveKey);

  const keyFor = hasKeyResolver
    ? toFunction(resolveKey, resolveKey)
    : identity.bind(undefined);

  const resolveValue = toFunction(closure, closure);

  const cache = new Map<unknown, unknown>();

  function memoized(...args: unknown[]): unknown {
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

  defineGetter(memoized, "size", () => cache.size);

  return assign(memoized, {
    keyFor,
    clear,
    value,
    has,
    delete: deleteEntry,
  }) as Memoized;
}
