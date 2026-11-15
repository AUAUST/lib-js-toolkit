import { describe, expect, test } from "vitest";

import { equals } from "@auaust/toolkit/array";

describe("equals", () => {
  test("compares items by SameValueZero", () => {
    expect(equals([Number.NaN, 1], [Number.NaN, 1])).toBe(true);
    expect(equals([{}], [{}])).toBe(false);
  });

  test("treats arrays of different lengths as unequal", () => {
    expect(equals([1], [1, 2])).toBe(false);
  });
});
