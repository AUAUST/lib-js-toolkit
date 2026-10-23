import { isNaN } from "@auaust/toolkit";
import { isNaN as mathIsNaN } from "@auaust/toolkit/math";
import { describe, expect, test } from "vitest";

describe("math", () => {
  test("exposes Number.isNaN from both the root and math entrypoints", () => {
    expect(isNaN).toBe(mathIsNaN);
    expect(isNaN).toBe(Number.isNaN);
    expect(isNaN(NaN)).toBe(true);
    expect(isNaN("NaN")).toBe(false);
    expect(isNaN(undefined)).toBe(false);
    expect(isNaN(42)).toBe(false);
  });
});
