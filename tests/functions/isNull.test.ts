import { isNull } from "@auaust/toolkit";
import { expect, test } from "vitest";

test("isNull()", () => {
  expect(isNull(null)).toBe(true);
});
