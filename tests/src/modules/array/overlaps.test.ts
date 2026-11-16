import { describe, expect, expectTypeOf, test } from "vitest";

import { overlaps } from "@auaust/toolkit/array";

describe("overlaps", () => {
  test("compares by SameValueZero", () => {
    const result = overlaps([1, Number.NaN], [Number.NaN]);

    expect(result).toBe(true);
    expectTypeOf(result).toEqualTypeOf<boolean>();
  });

  test("reads a set-like and passes nullish through", () => {
    expect(overlaps([1], new Set([2]))).toBe(false);
    expect(overlaps(null as number[] | null, [1])).toBeUndefined();
  });
});
