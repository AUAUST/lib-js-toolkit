import { isBigInt } from "@auaust/toolkit";
import { expect, test } from "vitest";

test("isBigInt()", () => {
  expect(isBigInt(1n)).toBe(true);
});
