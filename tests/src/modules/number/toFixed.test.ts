import { expect, test } from "vitest";

import { toFixed } from "@auaust/toolkit/number";

test("matches the method", () => {
  expect(toFixed(123.456, 2)).toBe((123.456).toFixed(2));
  expect(toFixed(123.456)).toBe((123.456).toFixed(0));
});
