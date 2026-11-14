import { describe, expect, test } from "vitest";

import { sameValueZero } from "@auaust/toolkit";

describe("sameValueZero", () => {
  test("treats NaN as equal to NaN", () => {
    expect(sameValueZero(Number.NaN, Number.NaN)).toBe(true);
  });

  test("treats 0 as equal to -0", () => {
    expect(sameValueZero(0, -0)).toBe(true);
  });
});
