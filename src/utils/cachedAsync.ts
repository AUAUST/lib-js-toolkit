import {
  cached,
  type CachedOptions,
  type CacheResolver,
  type KeyResolver,
} from "@auaust/toolkit/cached";
import { identity } from "@auaust/toolkit/identity";
import { isCallable } from "@auaust/toolkit/isCallable";
import { assign } from "@auaust/toolkit/object";
import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type {
  Callee,
  CallParameters,
  CallReturnType,
  MaybePromise,
} from "@auaust/toolkit/types";

export type CachedAsync<
  Callback extends CacheResolver,
  Key = CallParameters<Callback>[0],
> = {
  (
    this: void,
    ...args: CallParameters<Callback>
  ): MaybePromise<Awaited<CallReturnType<Callback>>>;

  call(
    thisArg: void,
    ...args: CallParameters<Callback>
  ): MaybePromise<Awaited<CallReturnType<Callback>>>;

  /**
   * Resolves a key without computing or caching a value.
   */
  keyFor: (this: void, ...args: CallParameters<Callback>) => Key;

  /**
   * Clears pending and fulfilled entries.
   */
  clear(): void;

  /**
   * Returns only fulfilled values without computing missing entries.
   */
  value(key: Key): Awaited<CallReturnType<Callback>> | undefined;

  /**
   * Returns the promise associated with a key without computing missing entries.
   * It will return a promise even if the entry is settled.
   */
  promise(key: Key): Promise<Awaited<CallReturnType<Callback>>> | undefined;

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
};

type CacheEntry = {
  promise: Promise<unknown>;
  fulfilled: boolean;
  result?: unknown;
};

/**
 * Caches asynchronous results with the key semantics and options of `cached()`.
 * Calls share one promise until fulfillment, then return the value synchronously.
 * `value()` exposes only fulfilled values. Rejected entries are removed so calls
 * can retry; synchronous resolver errors propagate without creating an entry.
 * Clearing or deleting pending entries does not cancel or restore them.
 */
export function cachedAsync<Callback extends CacheResolver, Key>(
  callback: Callback,
  resolveKey: KeyResolver<Callback, Key>,
): CachedAsync<Callback, Key>;
export function cachedAsync<
  Callback extends CacheResolver,
  Key = CallParameters<Callback>[0],
>(
  callback: Callback,
  options?: CachedOptions<Callback, Key>,
): CachedAsync<Callback, Key>;
export function cachedAsync(
  callback: Callee,
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
    ? resolveCallable(resolveKey, resolveKey)
    : identity.bind(undefined);

  const resolveValue = resolveCallable(callback, callback);

  const entries = cached(createEntry, {
    cachePrimitives,
  });

  function createEntry(
    this: void,
    key: unknown,
    ...args: unknown[]
  ): CacheEntry {
    const result = resolveValue(...args);

    const promise = Promise.resolve(result)
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

  function accessor(this: void, ...args: unknown[]): unknown {
    const key = keyFor(...args);

    const entry =
      hasKeyResolver && key === undefined
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

  return assign(accessor, {
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
