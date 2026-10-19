import { isArray } from "@auaust/toolkit";
import { expect, test } from "vitest";

test("isArray()", () => {
  expect(isArray([])).toBe(true);
});
