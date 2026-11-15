import { expect, test } from "vitest";

import { clamp } from "@auaust/toolkit/math";

test("bounds its value", () => {
  expect(clamp(5, 0, 3)).toBe(3);
  expect(clamp(-1, 0, 3)).toBe(0);
  expect(clamp(2, 0, 3)).toBe(2);
});
