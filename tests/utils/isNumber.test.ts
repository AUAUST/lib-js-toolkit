import { isNumber } from "@auaust/toolkit";
import { expect, test } from "vitest";

test("isNumber()", () => {
  expect(isNumber(42)).toBe(true);
});
