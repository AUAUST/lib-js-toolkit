import { filled } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("filled()", () => {
  test("returns false for filled values", () => {
    expect(filled("")).toBe(false);
    expect(filled([])).toBe(false);
    expect(filled({})).toBe(false);
    expect(filled(null)).toBe(false);
    expect(filled(undefined)).toBe(false);
    expect(filled(new Map())).toBe(false);
    expect(filled(new Set())).toBe(false);
  });

  test("returns true for non-filled values", () => {
    expect(filled("non-filled")).toBe(true);
    expect(filled([1, 2, 3])).toBe(true);
    expect(filled({ key: "value" })).toBe(true);
    expect(filled(42)).toBe(true);
    expect(filled(0)).toBe(true);
    expect(filled(NaN)).toBe(true);
    expect(filled(new Map([["key", "value"]]))).toBe(true);
    expect(filled(new Set([1, 2, 3]))).toBe(true);
  });
});
