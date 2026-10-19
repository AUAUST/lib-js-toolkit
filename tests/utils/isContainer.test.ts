import { isContainer } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("isContainer()", () => {
  test("returns `true` for all objects and functions", () => {
    expect(isContainer({})).toBe(true);
    expect(isContainer([])).toBe(true);
    expect(isContainer(() => {})).toBe(true);
    expect(isContainer(new Map())).toBe(true);
    expect(isContainer(new String("property"))).toBe(true);
    expect(isContainer(new Date())).toBe(true);
  });

  test("returns `false` for all non-objects and non-functions", () => {
    expect(isContainer(null)).toBe(false);
    expect(isContainer(undefined)).toBe(false);
    expect(isContainer(42)).toBe(false);
    expect(isContainer("property")).toBe(false);
    expect(isContainer(Symbol("property"))).toBe(false);
  });
});
