import { isObject } from "@auaust/toolkit";
import { expect, test } from "vitest";

test("isObject()", () => {
  expect(isObject(null)).toBe(false);
});
