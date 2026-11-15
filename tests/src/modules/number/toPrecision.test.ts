import { expect, test } from "vitest";

import { toPrecision } from "@auaust/toolkit/number";

test("matches the method", () => {
  expect(toPrecision(123.456, 4)).toBe((123.456).toPrecision(4));
  expect(toPrecision(123.456)).toBe((123.456).toPrecision());
});
