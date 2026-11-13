import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { map, memoize, type MemoizedIterable } from "@auaust/toolkit/iterable";

describe("memoize", () => {
  test("pulls each upstream value once across passes", () => {
    const mapper = vi.fn((value: number) => value * 2);
    const memoized = memoize(map([1, 2, 3], mapper));

    expect([...memoized]).toEqual([2, 4, 6]);
    expect([...memoized]).toEqual([2, 4, 6]);
    expect(mapper).toHaveBeenCalledTimes(3);
  });

  test("replays a broken pass's values before pulling the rest", () => {
    const mapper = vi.fn((value: number) => value);
    const memoized = memoize(map([1, 2, 3], mapper));

    const [first] = memoized;

    expect(first).toBe(1);

    expect(mapper).toHaveBeenCalledTimes(1);
    expect([...memoized]).toEqual([1, 2, 3]);
    expect(mapper).toHaveBeenCalledTimes(3);
  });

  test("interleaved cursors see the same sequence", () => {
    const memoized = memoize([1, 2, 3]);
    const first = memoized[Symbol.iterator]();
    const second = memoized[Symbol.iterator]();

    expect(first.next().value).toBe(1);
    expect(second.next().value).toBe(1);
    expect(second.next().value).toBe(2);
    expect(first.next().value).toBe(2);
    expect(first.next().value).toBe(3);
    expect(second.next().value).toBe(3);
    expect(first.next().done).toBe(true);
    expect(second.next().done).toBe(true);
  });

  test("makes a single-use source reusable", () => {
    const memoized = memoize(new Map([["a", 1]]).entries());

    expect([...memoized]).toEqual([["a", 1]]);
    expect([...memoized]).toEqual([["a", 1]]);
  });

  test("realize returns every value frozen, the same array each call", () => {
    const log: number[] = [];

    function* source() {
      for (const value of [1, 2, 3]) {
        log.push(value);

        yield value;
      }
    }

    const memoized = memoize(source());
    const values = memoized.realize();

    expect(values).toEqual([1, 2, 3]);
    expect(Object.isFrozen(values)).toBe(true);
    expect(memoized.realize()).toBe(values);
    expect(log).toEqual([1, 2, 3]);
  });

  test("close runs the upstream finally, break does not", () => {
    let finalized = 0;

    function* source() {
      try {
        yield 1;

        yield 2;

        yield 3;
      } finally {
        finalized++;
      }
    }

    const memoized = memoize(source());

    const [first] = memoized;

    expect(first).toBe(1);

    expect(finalized).toBe(0);
    memoized.close();
    expect(finalized).toBe(1);
    expect([...memoized]).toEqual([1]);
    expect(Object.isFrozen(memoized.realize())).toBe(false);
  });

  test("rethrows the stored upstream error after replaying earlier values", () => {
    const failure = new Error("boom");

    function* source() {
      yield 1;

      throw failure;
    }

    const memoized = memoize(source());
    const seen: number[] = [];

    expect(() => {
      for (const value of memoized) {
        seen.push(value);
      }
    }).toThrow(failure);

    expect(seen).toEqual([1]);

    const cursor = memoized[Symbol.iterator]();

    expect(cursor.next()).toEqual({ value: 1, done: false });

    let thrown: unknown;

    try {
      cursor.next();
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toBe(failure);
  });

  test("stores a protocol-violating result as the failure, never retried", () => {
    const next = vi.fn(() => {
      return undefined as never;
    });

    const memoized = memoize<number>({
      [Symbol.iterator]: () => {
        return { next };
      },
    });

    let first: unknown;
    let second: unknown;

    try {
      memoized.realize();
    } catch (error) {
      first = error;
    }

    try {
      memoized.realize();
    } catch (error) {
      second = error;
    }

    expect(first).toBeInstanceOf(TypeError);
    expect(second).toBe(first);
    expect(next).toHaveBeenCalledTimes(1);
  });

  test("throws on non-iterables and passes nullish through", () => {
    expect(() => memoize(42 as never)).toThrow(TypeError);
    expect(memoize(null)).toBeUndefined();
    expect(memoize(undefined)).toBeUndefined();
  });

  test("types", () => {
    const memoized = memoize([1, 2]);

    expectTypeOf(memoized).toEqualTypeOf<MemoizedIterable<number>>();

    for (const value of memoized) {
      expectTypeOf(value).toEqualTypeOf<number>();
    }

    expectTypeOf(memoized.realize()).toEqualTypeOf<readonly number[]>();
  });
});
