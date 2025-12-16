import { comparator } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("comparator()", () => {
  test("returns a comparator function which holds the custom operators", () => {
    const customOperators = {
      startsWith: (a: unknown, b: unknown): boolean => {
        if (typeof a === "string" && typeof b === "string") {
          return a.startsWith(b);
        }
        return false;
      },
      endsWith: (a: unknown, b: unknown): boolean => {
        if (typeof a === "string" && typeof b === "string") {
          return a.endsWith(b);
        }
        return false;
      },
    };

    const stringComparator = comparator(customOperators);

    expect(stringComparator("AUAUST", "startsWith", "AUA")).toBe(true);
    expect(stringComparator("AUAUST", "startsWith", "UST")).toBe(false);
    expect(stringComparator("AUAUST", "endsWith", "UST")).toBe(true);
    expect(stringComparator("AUAUST", "endsWith", "AUA")).toBe(false);
  });
});
