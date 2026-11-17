import { toPromise } from "#modules/async/utils/toPromise";
import { isCallable } from "#modules/function/guards/isCallable";
import {
  cache,
  type CachedOptions,
  type CacheResolver,
  type KeyResolver,
} from "#modules/function/utils/cache";
import { toFunction } from "#modules/function/utils/toFunction";
import { identity } from "#modules/general/utils/identity";
import { assign } from "#modules/object/utils/assign";
import type { Callee } from "#types/Callee";
import type { CallParameters } from "#types/CallParameters";
import type { CallReturnType } from "#types/CallReturnType";
import type { MaybePromise } from "#types/MaybePromise";

export interface CachedAsync<
  Closure extends CacheResolver,
  Key = CallParameters<Closure>[0],
> {
  (
    this: void,
    ...args: CallParameters<Closure>
  ): MaybePromise<Awaited<CallReturnType<Closure>>>;

  call(
    thisArg: undefined,
    ...args: CallParameters<Closure>
  ): MaybePromise<Awaited<CallReturnType<Closure>>>;

  /**
   * Resolves a key without computing or caching a value.
   */
  keyFor(this: void, ...args: CallParameters<Closure>): Key;

  /**
   * Clears pending and fulfilled entries.
   */
  clear(): void;

  /**
   * Returns only fulfilled values without computing missing entries.
   */
  value(key: Key): Awaited<CallReturnType<Closure>> | undefined;

  /**
   * Returns the promise associated with a key without computing missing entries.
   * It will return a promise even if the entry is settled.
   */
  promise(key: Key): Promise<Awaited<CallReturnType<Closure>>> | undefined;

  /**
   * Returns whether an entry exists, including pending entries.
   */
  has(key: Key): boolean;

  /**
   * Returns whether an entry is waiting for fulfillment or rejection.
   */
  pending(key: Key): boolean;

  /**
   * Returns whether an entry has fulfilled.
   */
  settled(key: Key): boolean;

  /**
   * Deletes an entry without cancelling its pending work.
   */
  delete(key: Key): boolean;
}

interface CacheEntry {
  promise: Promise<unknown>;
  fulfilled: boolean;
  result?: unknown;
}

/**
 * Caches asynchronous results with the key semantics and options of `cache()`.
 * Calls share one promise until fulfillment, then return the value synchronously.
 * Unlike `cache()`, primitive keys are cached by default. `value()` exposes only
 * fulfilled values. Rejected entries are removed so calls can retry; synchronous
 * resolver errors propagate without creating an entry. Clearing or deleting
 * pending entries does not cancel or restore them.
 */
export function cacheAsync<Closure extends CacheResolver, Key>(
  closure: Closure,
  resolveKey: KeyResolver<Closure, Key>,
): CachedAsync<Closure, Key>;
export function cacheAsync<
  Closure extends CacheResolver,
  Key = CallParameters<Closure>[0],
>(
  closure: Closure,
  options?: CachedOptions<Closure, Key>,
): CachedAsync<Closure, Key>;
export function cacheAsync(
  closure: Callee,
  options: CachedOptions | Callee = {},
): CachedAsync<Callee> {
  const { cachePrimitives = true, resolveKey } = isCallable(options)
    ? {
        cachePrimitives: true,
        resolveKey: options,
      }
    : options;

  const hasKeyResolver = isCallable(resolveKey);

  const keyFor = hasKeyResolver
    ? toFunction(resolveKey, resolveKey)
    : identity.bind(undefined);

  const resolveValue = toFunction(closure, closure);

  const entries = cache(createEntry, {
    cachePrimitives,
  });

  function createEntry(
    this: void,
    key: unknown,
    ...args: unknown[]
  ): CacheEntry {
    const result = resolveValue(...args);

    const promise = toPromise(result)
      .then((value) => {
        entry.result = value;
        entry.fulfilled = true;

        return value;
      })
      .catch((error: unknown) => {
        if (entries.value(key) === entry) {
          entries.delete(key);
        }

        throw error;
      });

    const entry: CacheEntry = {
      promise,
      fulfilled: false,
    };

    return entry;
  }

  function cached(this: void, ...args: unknown[]): unknown {
    const key = keyFor(...args);

    const entry = hasKeyResolver && key === undefined
      ? createEntry(key, ...args)
      : entries(key, ...args);

    return entry.fulfilled ? entry.result : entry.promise;
  }

  function value(key: unknown): unknown {
    const entry = entries.value(key);

    return entry?.fulfilled ? entry.result : undefined;
  }

  function promise(key: unknown): Promise<unknown> | undefined {
    const entry = entries.value(key);

    return entry ? entry.promise : undefined;
  }

  function pending(key: unknown): boolean {
    return entries.value(key)?.fulfilled === false;
  }

  function settled(key: unknown): boolean {
    return entries.value(key)?.fulfilled === true;
  }

  return assign(cached, {
    keyFor,
    clear: entries.clear,
    value,
    promise,
    pending,
    settled,
    has: entries.has,
    delete: entries.delete,
  }) as CachedAsync<Callee>;
}
