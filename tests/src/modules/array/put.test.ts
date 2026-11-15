import { describe, expect, expectTypeOf, test } from "vitest";

import { put } from "@auaust/toolkit/array";

describe("put", () => {
  test("copies with the value at an index, a negative one from the end", () => {
    const array = [1, 2];
    const result = put(array, -1, 3);

    expect(result).toEqual([1, 3]);
    expect(array).toEqual([1, 2]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  test("throws a RangeError out of range and passes nullish through", () => {
    expect(() => put([1, 2], 2, 3)).toThrow(RangeError);
    expect(put(null, 0, 1)).toBeUndefined();
  });
});
