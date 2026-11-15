import { describe, expect, expectTypeOf, test } from "vitest";

import { hasDuplicates } from "@auaust/toolkit/array";

describe("hasDuplicates", () => {
  test("detects repeats by SameValueZero", () => {
    expect(hasDuplicates([NaN, 1, NaN])).toBe(true);
    expect(hasDuplicates(["a", "b"] as const)).toBe(false);
    expectTypeOf(hasDuplicates([1])).toEqualTypeOf<boolean>();
  });

  test("passes nullish through", () => {
    expect(hasDuplicates(null)).toBeUndefined();
  });
});
