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

  test("allows to disable specific operators", () => {
    const numberComparator = comparator({
      isEven: (a: unknown): boolean => {
        if (typeof a === "number") {
          return a % 2 === 0;
        }
        return false;
      },
      "==": null,
      "<=": undefined,
    });

    expect(numberComparator(4, "isEven")).toBe(true);
    expect(numberComparator(5, "isEven")).toBe(false);

    // @ts-expect-error
    expect(() => numberComparator(5, "==", 5)).toThrowError(/disabled/);

    // @ts-expect-error
    expect(() => numberComparator(3, "<=", 5)).toThrowError(/disabled/);
  });
});
