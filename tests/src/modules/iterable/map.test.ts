import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { map } from "@auaust/toolkit/iterable";
import type { Maybe } from "@auaust/toolkit/types";

describe("map", () => {
  test("runs nothing before the first next and pulls one value per next", () => {
    const log: number[] = [];

    function* source() {
      for (const value of [1, 2, 3]) {
        log.push(value);

        yield value;
      }
    }

    const mapper = vi.fn((value: number, index: number) => value * 10 + index);
    const result = map(source(), mapper);

    expect(mapper).toHaveBeenCalledTimes(0);
    expect(log).toEqual([]);
    expect(result.next()).toEqual({ value: 10, done: false });
    expect(log).toEqual([1]);
    expect(result.next()).toEqual({ value: 21, done: false });
    expect(log).toEqual([1, 2]);
    expect(mapper).toHaveBeenCalledTimes(2);
  });

  test("throws eagerly on invalid arguments", () => {
    expect(() => map([1], 42 as never)).toThrow(TypeError);
    expect(() => map(42 as never, String)).toThrow(TypeError);
  });

  test("returns undefined for nullish subjects without calling the mapper", () => {
    const mapper = vi.fn();

    expect(map(null, mapper)).toBeUndefined();
    expect(map(undefined, mapper)).toBeUndefined();
    expect(mapper).not.toHaveBeenCalled();

    expectTypeOf(map([1], String)).toEqualTypeOf<
      IteratorObject<string, undefined>
    >();

    expectTypeOf(map([1] as Maybe<number[]>, String)).toEqualTypeOf<
      IteratorObject<string, undefined> | undefined
    >();
  });

  test("is single use", () => {
    const result = map([1, 2], (value) => value * 2);

    expect([...result]).toEqual([2, 4]);
    expect([...result]).toEqual([]);
  });

  test("closes its source on break and on a throwing mapper", () => {
    let closed = false;

    function* source() {
      try {
        yield 1;

        yield 2;
      } finally {
        closed = true;
      }
    }

    const [first] = map(source(), String);

    expect(first).toBe("1");

    expect(closed).toBe(true);

    closed = false;

    expect(() => {
      return [
        ...map(source(), () => {
          throw new Error("mapper");
        }),
      ];
    }).toThrow("mapper");

    expect(closed).toBe(true);
  });

  test("reads a live source", () => {
    const set = new Set([1]);
    const result = map(set, (value) => value);

    expect(result.next()).toEqual({ value: 1, done: false });

    set.add(2);

    expect(result.next()).toEqual({ value: 2, done: false });
  });

  test("iterates strings by code point and maps by entry", () => {
    expect([...map("a😀", (character) => character)]).toEqual(["a", "😀"]);
    expect([...map(new Map([["a", 1]]), (entry) => entry)]).toEqual([["a", 1]]);
  });

  test("infers element types", () => {
    expectTypeOf(
      Array.from(map(new Set(["a"]), (string) => string.length)),
    ).toEqualTypeOf<number[]>();
  });
});
