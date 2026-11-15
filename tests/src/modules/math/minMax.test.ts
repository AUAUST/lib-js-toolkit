import { expect, test } from "vitest";

import { minMax } from "@auaust/toolkit/math";

test("returns the smallest and largest value", () => {
  expect(minMax(3, 1, 2)).toEqual([1, 3]);
});

test("throws without values", () => {
  expect(() => minMax()).toThrow(RangeError);
});
