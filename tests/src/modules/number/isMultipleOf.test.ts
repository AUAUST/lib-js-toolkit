import { expect, test } from "vitest";

import { isMultipleOf } from "@auaust/toolkit/number";

test("detects multiples", () => {
  expect(isMultipleOf(9, 3)).toBe(true);
  expect(isMultipleOf(10, 3)).toBe(false);
});

test("is false for infinities and NaN", () => {
  expect(isMultipleOf(Infinity, 2)).toBe(false);
  expect(isMultipleOf(NaN, 2)).toBe(false);
});
