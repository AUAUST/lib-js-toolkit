import { describe, expect, expectTypeOf, test } from "vitest";

import { toObject } from "@auaust/toolkit/object";

describe("toObject", () => {
  test("wraps primitives and turns nullish values into empty objects", () => {
    const wrapped = toObject(1);

    expectTypeOf(wrapped).toEqualTypeOf<NumberConstructor["prototype"]>();
    expect(wrapped).toBeInstanceOf(Number);
    expect(wrapped.valueOf()).toBe(1);
    expectTypeOf(toObject(null)).toEqualTypeOf<{}>();
    expect(toObject(null)).toEqual({});
  });

  test("wraps each member of a union", () => {
    function wrap(input: "a" | 1) {
      return toObject(input);
    }

    expectTypeOf(wrap).returns.toEqualTypeOf<
      StringConstructor["prototype"] | NumberConstructor["prototype"]
    >();

    expect(wrap("a")).toBeInstanceOf(String);
  });

  test("returns objects as is", () => {
    const target = {
      a: 1,
    };

    expectTypeOf(toObject(target)).toEqualTypeOf<{ a: number }>();
    expect(toObject(target)).toBe(target);
  });
});
