import { isString } from "@auaust/toolkit";
import { expect, test } from "vitest";

test("isString()", () => {
  expect(isString("hello")).toBe(true);
});
