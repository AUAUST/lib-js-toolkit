import { isIterable } from "#modules/iterable/guards/isIterable";
import { freeze } from "#modules/object/utils/freeze";
import type { MemoizedIterable } from "#modules/iterable/types/MemoizedIterable";
import type { Maybe } from "#types/Maybe";

/**
 * Wraps an iterable so every pass replays the values already pulled before pulling more; pulls each value once.
 * The source's iterator is obtained at call time and owned for the wrapper's whole life: a pass ending early never closes it, only `close()` does.
 * A source error is rethrown by every later pull past the cached values, never retried. A nullish source returns `undefined`.
 *
 * @throws {TypeError} at call time when the source is not iterable.
 */
export function memoize<Value>(
  iterable: Iterable<Value>,
): MemoizedIterable<Value>;
export function memoize<Value>(
  iterable: Maybe<Iterable<Value>>,
): MemoizedIterable<Value> | undefined;
export function memoize<Value>(
  iterable: Maybe<Iterable<Value>>,
): MemoizedIterable<Value> | undefined {
  if (iterable == null) {
    return;
  }

  if (!isIterable(iterable)) {
    throw new TypeError("Expected an iterable.");
  }

  const upstream = iterable[Symbol.iterator]();
  const cache: Value[] = [];

  let state: "open" | "done" | "closed" | "failed" = "open";
  let failure: unknown;

  function pull(): boolean {
    if (state === "failed") {
      throw failure;
    }

    if (state !== "open") {
      return false;
    }

    let done: Maybe<boolean>;
    let value: Value;

    try {
      ({ done, value } = upstream.next());
    } catch (error) {
      state = "failed";
      failure = error;

      throw error;
    }

    if (done) {
      state = "done";

      return false;
    }

    cache.push(value);

    return true;
  }

  function* replayed(): Generator<Value, undefined, unknown> {
    for (let index = 0; index < cache.length || pull(); index++) {
      yield cache[index];
    }
  }

  function realize(): readonly Value[] {
    let pulled = pull();

    while (pulled) {
      pulled = pull();
    }

    if (state === "done") {
      freeze(cache);
    }

    return cache;
  }

  function close(): void {
    if (state !== "open") {
      return;
    }

    state = "closed";
    upstream.return?.();
  }

  return {
    [Symbol.iterator]: replayed,
    realize,
    close,
  };
}
