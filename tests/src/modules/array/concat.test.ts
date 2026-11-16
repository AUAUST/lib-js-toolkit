import { describe, expect, expectTypeOf, test } from "vitest";

import { concat } from "@auaust/toolkit/array";
import type { Maybe } from "@auaust/toolkit/types";

describe("concat", () => {
  test("appends values and the items of array values into a new array", () => {
    const source = [1, 2];
    const result = concat(source, 3, [4, [5]], "ab");

    expect(result).toEqual([1, 2, 3, 4, [5], "ab"]);
    expect(result).not.toBe(source);
    expect(source).toEqual([1, 2]);

    expectTypeOf(result).toEqualTypeOf<
      [...number[], number, number, number[], string]
    >();
  });

  test("keeps tuple slots and accepts readonly arrays", () => {
    expectTypeOf(concat([1, "a"] as const, [true] as const)).toEqualTypeOf<
      [1, "a", true]
    >();

    expectTypeOf(concat([1] as readonly number[], [2])).toEqualTypeOf<
      number[]
    >();
  });

  test("passes nullish through", () => {
    expect(concat(null, [1])).toBeUndefined();

    expectTypeOf(concat([1] as Maybe<number[]>, 2)).toEqualTypeOf<
      [...number[], number] | undefined
    >();
  });

  test("copies any iterable but a string", () => {
    const result = concat(new Set([1, 2]), 3, "a");

    expect(result).toEqual([1, 2, 3, "a"]);
    expectTypeOf(result).toEqualTypeOf<[...number[], number, string]>();
    expect(() => concat({} as never, 1)).toThrow(TypeError);
  });
});
