import { expect, test } from "vitest";

import { toExponential } from "@auaust/toolkit/number";

test("matches the method", () => {
  expect(toExponential(123.456, 1)).toBe((123.456).toExponential(1));
  expect(toExponential(123.456)).toBe((123.456).toExponential());
});
