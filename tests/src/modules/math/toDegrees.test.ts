import { expect, test } from "vitest";

import { toDegrees } from "@auaust/toolkit/math";

test("converts radians to degrees", () => {
  expect(toDegrees(Math.PI)).toBe(180);
});
