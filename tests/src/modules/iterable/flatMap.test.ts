import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { flatMap } from "@auaust/toolkit/iterable";
import type { Maybe } from "@auaust/toolkit/types";

describe("flatMap", () => {
  test("yields the values of each mapped iterable or iterator", () => {
    const result = flatMap([1, 2], (value, index) => {
      return index === 0 ? [value, value] : new Set([value * 10]).values();
    });

    expect([...result]).toEqual([1, 1, 20]);
    expectTypeOf(result).toEqualTypeOf<IteratorObject<number, undefined>>();

    const iterator = flatMap([1], (value) => {
      return {
        next: () => {
          return { done: true as const, value };
        },
      };
    });

    expect([...iterator]).toEqual([]);
  });

  test("yields a bare mapped value as is, strings included", () => {
    const result = flatMap([1, 2], (value) => {
      return value === 1 ? [value, value] : value;
    });

    expect([...result]).toEqual([1, 1, 2]);
    expectTypeOf(result).toEqualTypeOf<IteratorObject<number, undefined>>();
    expect([...flatMap([1], () => "ab")]).toEqual(["ab"]);
  });

  test("runs nothing before iteration and closes the source and the inner iterable on break", () => {
    const closed: string[] = [];
    const mapper = vi.fn(() => inner());

    function* source() {
      try {
        yield 1;

        yield 2;
      } finally {
        closed.push("source");
      }
    }

    function* inner() {
      try {
        yield "a";

        yield "b";
      } finally {
        closed.push("inner");
      }
    }

    const result = flatMap(source(), mapper);

    expect(mapper).not.toHaveBeenCalled();

    const [first] = result;

    expect(first).toBe("a");
    expect(closed).toEqual(["inner", "source"]);
  });

  test("throws eagerly on invalid arguments and passes nullish through", () => {
    expect(() => flatMap([1], true as never)).toThrow(TypeError);
    expect(() => flatMap(42 as never, () => [])).toThrow(TypeError);
    expect(flatMap(null, () => [])).toBeUndefined();

    expectTypeOf(
      flatMap([1] as Maybe<number[]>, (value) => {
        return [String(value)];
      }),
    ).toEqualTypeOf<IteratorObject<string, undefined> | undefined>();
  });
});
