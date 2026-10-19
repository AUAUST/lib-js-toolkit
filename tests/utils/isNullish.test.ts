import { isNullish } from "@auaust/toolkit";
import { expect, test } from "vitest";

test("isNullish()", () => {
  expect(isNullish(null)).toBe(true);
  expect(isNullish(undefined)).toBe(true);
  expect(isNullish(false)).toBe(false);
});
