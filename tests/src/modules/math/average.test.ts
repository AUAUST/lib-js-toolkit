import { expect, test } from "vitest";

import { average } from "@auaust/toolkit/math";

test("returns the mean", () => {
  expect(average(1, 2, 6)).toBe(3);
});

test("throws without values", () => {
  expect(() => average()).toThrow(RangeError);
});
