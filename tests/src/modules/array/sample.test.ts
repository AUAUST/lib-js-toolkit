import { describe, expect, expectTypeOf, test } from "vitest";

import { sample } from "@auaust/toolkit/array";

describe("sample", () => {
  test("never returns the same position twice", () => {
    const tuple = [1, 2, 3, 4, 5] as const;
    const result = sample(tuple, 5);

    expect(result.toSorted()).toEqual([1, 2, 3, 4, 5]);
    expectTypeOf(result).toEqualTypeOf<(1 | 2 | 3 | 4 | 5)[]>();
  });

  test("returns count items, every item past the length", () => {
    expect(sample([1, 2, 3], 2)).toHaveLength(2);
    expect(sample([1, 2, 3], 4).toSorted()).toEqual([1, 2, 3]);
  });

  test("passes nullish through before checking count", () => {
    expect(sample(null, 2.5)).toBeUndefined();
  });

  test("throws a RangeError for a negative or non-integer count", () => {
    expect(() => sample([1, 2, 3], 2.5)).toThrow(RangeError);
    expect(() => sample([1, 2, 3], -1)).toThrow(RangeError);
  });
});
