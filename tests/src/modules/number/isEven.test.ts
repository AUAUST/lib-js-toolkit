import { expect, test } from "vitest";

import { isEven } from "@auaust/toolkit/number";

test("detects even integers and bigints", () => {
  expect(isEven(4)).toBe(true);
  expect(isEven(-3)).toBe(false);
  expect(isEven(4n)).toBe(true);
  expect(isEven(3n)).toBe(false);
});

test("is false for NaN, infinities and fractions", () => {
  expect(isEven(NaN)).toBe(false);
  expect(isEven(Infinity)).toBe(false);
  expect(isEven(2.5)).toBe(false);
});
