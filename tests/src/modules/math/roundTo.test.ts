import { expect, test } from "vitest";

import { roundTo } from "@auaust/toolkit/math";

test("rounds to the nearest multiple of its step", () => {
  expect(roundTo(7, 5)).toBe(5);
  expect(roundTo(1.26, 0.5)).toBe(1.5);
});

test("rejects a non-positive step", () => {
  expect(() => roundTo(1, 0)).toThrow(RangeError);
});
