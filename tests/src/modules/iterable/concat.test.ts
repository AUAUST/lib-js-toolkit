import { describe, expect, expectTypeOf, test } from "vitest";

import { concat } from "@auaust/toolkit/iterable";
import type { Maybe } from "@auaust/toolkit/types";

describe("concat", () => {
  test("yields each iterable's values in turn", () => {
    const result = concat([1, 2], new Set(["a"]), "bc");

    expect([...result]).toEqual([1, 2, "a", "b", "c"]);

    expectTypeOf(result).toEqualTypeOf<
      IteratorObject<number | string, undefined>
    >();

    expect([...concat([1])]).toEqual([1]);
  });

  test("reads each source only once the previous one is exhausted", () => {
    const log: string[] = [];

    function* source(name: string) {
      log.push(name);

      yield name;
    }

    const result = concat(source("a"), source("b"));

    expect(log).toEqual([]);
    expect(result.next()).toEqual({ value: "a", done: false });
    expect(log).toEqual(["a"]);
  });

  test("closes the current source on break", () => {
    let closed = false;

    function* source() {
      try {
        yield 1;

        yield 2;
      } finally {
        closed = true;
      }
    }

    const [first] = concat(source(), [3]);

    expect(first).toBe(1);
    expect(closed).toBe(true);
  });

  test("throws eagerly on non-iterables and passes a nullish first source through", () => {
    expect(() => concat([1], 2 as never)).toThrow(TypeError);
    expect(() => concat(1 as never)).toThrow(TypeError);
    expect(concat(null, [1])).toBeUndefined();

    expectTypeOf(concat([1] as Maybe<number[]>, ["a"])).toEqualTypeOf<
      IteratorObject<number | string, undefined> | undefined
    >();
  });
});
