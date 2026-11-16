import { describe, expect, test } from "vitest";

import { numeric } from "@auaust/toolkit";

describe("numeric", () => {
  test("ranks numbers, then NaN, then anything else in source order", () => {
    const invalidDate = new Date(NaN);

    const sorted = [3, "b", NaN, 2n, null, 0, -0, "a", invalidDate, 1].sort(
      numeric,
    );

    expect(sorted).toEqual([-0, 0, 1, 2n, 3, NaN, invalidDate, "b", null, "a"]);
    expect(Object.is(sorted[0], -0)).toBe(true);
    expect(sorted[6]).toBe(invalidDate);
  });
});
