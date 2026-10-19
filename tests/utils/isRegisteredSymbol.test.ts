import { isRegisteredSymbol } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("isRegisteredSymbol()", () => {
  test("returns `true` for registered symbols", () => {
    expect(isRegisteredSymbol(Symbol.for("property"))).toBe(true);
  });

  test("returns `false` for non-registered symbols", () => {
    expect(isRegisteredSymbol(Symbol("property"))).toBe(false);
  });

  test("returns `false` for non-symbols", () => {
    expect(isRegisteredSymbol(null)).toBe(false);
    expect(isRegisteredSymbol("property")).toBe(false);
    expect(isRegisteredSymbol(42)).toBe(false);
    expect(isRegisteredSymbol({ random: true })).toBe(false);
  });
});
