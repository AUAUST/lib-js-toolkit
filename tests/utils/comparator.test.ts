import { describe, expect, expectTypeOf, test } from "vitest";

import { comparator } from "@auaust/toolkit";
import { isNumber } from "@auaust/toolkit/isNumber";
import { isString } from "@auaust/toolkit/isString";
import { callable } from "@auaust/toolkit/protocols/callable";

describe("comparator", () => {
  test("returns a comparator function which holds the custom operators", () => {
    const customOperators = {
      startsWith: (a: unknown, b: unknown): boolean => {
        if (isString(a) && isString(b)) {
          return a.startsWith(b);
        }

        return false;
      },
      endsWith: (a: unknown, b: unknown): boolean => {
        if (isString(a) && isString(b)) {
          return a.endsWith(b);
        }

        return false;
      },
    };

    const stringComparator = comparator(customOperators);

    expectTypeOf(stringComparator).returns.toEqualTypeOf<boolean>();
    expect(stringComparator("AUAUST", "startsWith", "AUA")).toBe(true);
    expect(stringComparator("AUAUST", "startsWith", "UST")).toBe(false);
    expect(stringComparator("AUAUST", "endsWith", "UST")).toBe(true);
    expect(stringComparator("AUAUST", "endsWith", "AUA")).toBe(false);
  });

  test("allows to disable specific operators", () => {
    const numberComparator = comparator({
      "isEven": (a: unknown): boolean => {
        if (isNumber(a)) {
          return a % 2 === 0;
        }

        return false;
      },
      "==": null,
      "<=": undefined,
    });

    expect(numberComparator(4, "isEven")).toBe(true);
    expect(numberComparator(5, "isEven")).toBe(false);
    expect(() => {
      // @ts-expect-error

      return numberComparator(5, "==", 5);
    }).toThrow(/disabled/);
    expect(() => {
      // @ts-expect-error

      return numberComparator(3, "<=", 5);
    }).toThrow(/disabled/);
  });

  test("accepts callable custom operators", () => {
    const operator = {
      offset: 2,
      [callable](left: unknown, right: unknown) {
        return Number(left) + this.offset === right;
      },
    };

    const compare = comparator({
      custom: operator,
    });

    expect(compare(2, "custom", 4)).toBe(true);
  });
});
