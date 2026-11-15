import { expect, test } from "vitest";

import { toRadians } from "@auaust/toolkit/math";

test("converts degrees to radians", () => {
  expect(toRadians(180)).toBe(Math.PI);
});
