import { describe, expect, expectTypeOf, test } from "vitest";

import { clear } from "@auaust/toolkit/array";

describe("clear", () => {
  test("empties the array in place and returns it", () => {
    const array = [1, 2, 3];
    const result = clear(array);

    expect(result).toBe(array);
    expect(array).toHaveLength(0);
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  test("passes nullish through", () => {
    const maybe = null as number[] | null;

    expect(clear(null)).toBeUndefined();
    expect(clear(undefined)).toBeUndefined();
    expectTypeOf(clear(null)).toEqualTypeOf<undefined>();
    expectTypeOf(clear(maybe)).toEqualTypeOf<number[] | undefined>();
  });

  test("throws on a non-array", () => {
    // @ts-expect-error A string is not an array.
    expect(() => clear("a")).toThrow(TypeError);
    // @ts-expect-error An array-like is not an array.
    expect(() => clear({ length: 1 })).toThrow(TypeError);
  });
});
