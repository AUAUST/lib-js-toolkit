import { expect, test } from "vitest";

import { mul } from "@auaust/toolkit/math";

test("multiplies its factors", () => {
  expect(mul(2, 3)).toBe(6);
});

test("returns 1 without factors", () => {
  expect(mul()).toBe(1);
});
