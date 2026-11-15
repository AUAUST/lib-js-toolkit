import { expect, test } from "vitest";

import { isBetween } from "@auaust/toolkit/number";

test("includes both bounds", () => {
  expect(isBetween(0, 0, 1)).toBe(true);
  expect(isBetween(1n, 0n, 1n)).toBe(true);
  expect(isBetween(2, 0, 1)).toBe(false);
});

test("compares infinities as ordinary bounds", () => {
  expect(isBetween(Infinity, 0, Infinity)).toBe(true);
  expect(isBetween(NaN, -Infinity, Infinity)).toBe(false);
});
