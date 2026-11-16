import { isPlainObject } from "#modules/object/guards/isPlainObject";
import { isEnumerable } from "#modules/object/utils/isEnumerable";
import { ownEnumerableKeys } from "#modules/object/utils/ownEnumerableKeys";
import type { DeepReadonly } from "#types/DeepReadonly";
import type { Merged } from "#types/Merged";

type Mergeable = Record<string | symbol, unknown>;

function holdsKey(source: Mergeable, key: PropertyKey): boolean {
  return key !== "__proto__" && isEnumerable(source, key);
}

function resolveKey(sources: readonly Mergeable[], key: PropertyKey): unknown {
  const values = sources
    .filter((source) => holdsKey(source, key))
    .map((source) => source[key]);

  if (isPlainObject(values[0])) {
    return lazyMerge(...values.filter((value) => isPlainObject(value)));
  }

  return values.findLast((value) => !isPlainObject(value));
}

/**
 * Returns a readonly view holding on each read what `toMerged(...sources)` would
 * hold. Each key resolves on its first read, nested views included, and keeps
 * that value: a later source mutation shows only for keys not read yet. Spread,
 * `Object.keys` and `for…in` see the merged keys.
 *
 * @throws {TypeError} When written to, defined on or deleted from, in strict code.
 */
export function lazyMerge<Sources extends readonly unknown[]>(
  ...sources: Sources
): DeepReadonly<Merged<{}, Sources>>;
export function lazyMerge(...sources: unknown[]): object {
  const mergeables: Mergeable[] = sources.filter((source) => {
    return isPlainObject(source);
  });

  const resolved = new Map<PropertyKey, unknown>();

  function has(target: object, key: PropertyKey): boolean {
    return mergeables.some((source) => holdsKey(source, key));
  }

  function get(target: object, key: PropertyKey, receiver: unknown): unknown {
    if (resolved.has(key)) {
      return resolved.get(key);
    }

    if (!has(target, key)) {
      return Reflect.get(target, key, receiver);
    }

    const value = resolveKey(mergeables, key);

    resolved.set(key, value);

    return value;
  }

  function ownKeys(): (string | symbol)[] {
    const keys = new Set(mergeables.flatMap(ownEnumerableKeys));

    keys.delete("__proto__");

    return [...keys];
  }

  function getOwnPropertyDescriptor(
    target: object,
    key: PropertyKey,
  ): PropertyDescriptor | undefined {
    if (!has(target, key)) {
      return;
    }

    return {
      configurable: true,
      enumerable: true,
      value: get(target, key, undefined),
      writable: false,
    };
  }

  function reject(): boolean {
    return false;
  }

  return new Proxy(
    {},
    {
      defineProperty: reject,
      deleteProperty: reject,
      get,
      getOwnPropertyDescriptor,
      has,
      ownKeys,
      set: reject,
    },
  );
}
