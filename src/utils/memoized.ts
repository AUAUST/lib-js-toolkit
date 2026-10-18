import { assign, defineGetter } from "@auaust/toolkit/object";
import { resolveCallable } from "@auaust/toolkit/resolveCallable";
import type {
  Callee,
  CallParameters,
  CallReturnType,
  CallSignature,
  CallThisParameterType,
} from "@auaust/toolkit/types";

export type Memoized<Callback extends Callee = Callee> =
  CallSignature<Callback> & {
    /** Clears every cached value. */
    clear(): void;

    /** The number of cached entries. */
    get size(): number;

    /** Returns a cached value without computing it. */
    value(
      key: CallParameters<Callback>[0],
    ): CallReturnType<Callback> | undefined;

    /** Returns whether a value is cached for the given key. */
    has(key: CallParameters<Callback>[0]): boolean;

    /** Deletes the cached value for the given key. */
    delete(key: CallParameters<Callback>[0]): boolean;
  };

export function memoized<Callback extends Callee>(
  callback: Callback,
): Memoized<Callback> {
  type Key = CallParameters<Callback>[0];
  type Return = CallReturnType<Callback>;

  const resolve = resolveCallable(callback);
  const cache = new Map<Key, Return>();

  function accessor(
    this: CallThisParameterType<Callback>,
    ...args: CallParameters<Callback>
  ): Return {
    const key: Key = args[0];

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = resolve.call(this, ...args);

    cache.set(key, result);

    return result;
  }

  function clear(): void {
    cache.clear();
  }

  function value(key: Key): Return | undefined {
    return cache.get(key);
  }

  function has(key: Key): boolean {
    return cache.has(key);
  }

  function deleteEntry(key: Key): boolean {
    return cache.delete(key);
  }

  defineGetter(accessor, "size", () => cache.size);

  return assign(accessor, {
    clear,
    value,
    has,
    delete: deleteEntry,
  }) as Memoized<Callback>;
}
