import { describe, expect, test } from "vitest";

import { isNaN } from "@auaust/toolkit/guard";

describe("isNaN", () => {
  test("is Number.isNaN", () => {
    expect(isNaN).toBe(Number.isNaN);
    expect(isNaN(NaN)).toBe(true);
    expect(isNaN("NaN")).toBe(false);
    expect(isNaN(undefined)).toBe(false);
    expect(isNaN(42)).toBe(false);
  });
});
