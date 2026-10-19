import { isBoolean } from "@auaust/toolkit";
import { expect, test } from "vitest";

test("isBoolean()", () => {
  expect(isBoolean(false)).toBe(true);
});
