import { isSymbol } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("isSymbol()", () => {
  test("returns `true` for symbols", () => {
    expect(isSymbol(Symbol("property"))).toBe(true);
    expect(isSymbol(Symbol.for("property"))).toBe(true);
  });

  test("returns `false` for non-symbols", () => {
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol("property")).toBe(false);
    expect(isSymbol(42)).toBe(false);
    expect(isSymbol({ random: true })).toBe(false);
  });
});
