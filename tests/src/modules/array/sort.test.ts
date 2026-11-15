import { describe, expect, expectTypeOf, test } from "vitest";

import { sort } from "@auaust/toolkit/array";

describe("sort", () => {
  test("sorts in place and returns its input", () => {
    const array = [10, 9, 1];
    const result = sort(array);

    expect(result).toBe(array);
    expect(result).toEqual([1, 10, 9]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
    expect(sort(array, (left, right) => left - right)).toEqual([1, 9, 10]);
  });

  test("passes nullish through", () => {
    expect(sort(null)).toBeUndefined();
  });
});
