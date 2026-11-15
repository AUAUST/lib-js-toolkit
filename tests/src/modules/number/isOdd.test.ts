import { expect, test } from "vitest";

import { isOdd } from "@auaust/toolkit/number";

test("detects odd integers and bigints", () => {
  expect(isOdd(-3)).toBe(true);
  expect(isOdd(4)).toBe(false);
  expect(isOdd(3n)).toBe(true);
  expect(isOdd(-3n)).toBe(true);
});

test("is false for NaN, infinities and fractions", () => {
  expect(isOdd(Infinity)).toBe(false);
  expect(isOdd(NaN)).toBe(false);
  expect(isOdd(1.5)).toBe(false);
});
