import { describe, expect, expectTypeOf, test } from "vitest";

import { flat } from "@auaust/toolkit/array";

describe("flat", () => {
  test("flattens one level by default, deeper with a depth", () => {
    const nested = [1, [2, [3]]];

    expect(flat(nested)).toEqual([1, 2, [3]]);
    expect(flat(nested, Infinity)).toEqual([1, 2, 3]);
    expectTypeOf(flat([[1], [2]])).toEqualTypeOf<number[]>();
  });

  test("flattens nothing for a negative depth and passes nullish through", () => {
    expect(flat([1, [2]], -1)).toEqual([1, [2]]);
    expect(flat(null)).toBeUndefined();
  });

  test("copies any iterable but a string", () => {
    const result = flat(new Set([[1], [2]]));

    expect(result).toEqual([1, 2]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
    expect(() => flat({} as never)).toThrow(TypeError);
  });
});
