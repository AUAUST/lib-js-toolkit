import { expect, test } from "vitest";

import { isNegative } from "@auaust/toolkit/number";

test("detects negative numbers and bigints", () => {
  expect(isNegative(-1)).toBe(true);
  expect(isNegative(-1n)).toBe(true);
  expect(isNegative(1n)).toBe(false);
});

test("is false for zeros and NaN", () => {
  expect(isNegative(-0)).toBe(false);
  expect(isNegative(NaN)).toBe(false);
});
