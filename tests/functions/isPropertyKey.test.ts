import { isPropertyKey } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("isPropertyKey()", () => {
  test("accepts strings", () => {
    expect(isPropertyKey("property")).toBe(true);
  });

  test("accepts numbers", () => {
    expect(isPropertyKey(42)).toBe(true);
  });

  test("accepts symbols", () => {
    expect(isPropertyKey(Symbol("property"))).toBe(true);
  });

  test("rejects other values", () => {
    expect(isPropertyKey({ random: true })).toBe(false);
  });
});
