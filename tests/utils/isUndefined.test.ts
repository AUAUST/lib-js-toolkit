import { isUndefined } from "@auaust/toolkit";
import { expect, test } from "vitest";

test("isUndefined()", () => {
  expect(isUndefined(undefined)).toBe(true);
});
