import { expect, test } from "vitest";

import { isPositive } from "@auaust/toolkit/number";

test("detects positive numbers and bigints", () => {
  expect(isPositive(1)).toBe(true);
  expect(isPositive(1n)).toBe(true);
  expect(isPositive(-1n)).toBe(false);
});

test("is false for zeros and NaN", () => {
  expect(isPositive(-0)).toBe(false);
  expect(isPositive(NaN)).toBe(false);
});
