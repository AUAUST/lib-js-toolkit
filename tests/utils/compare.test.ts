import { isNumber } from "@auaust/toolkit/isNumber";
import { isString } from "@auaust/toolkit/isString";
import { callable } from "@auaust/toolkit/protocols/callable";
import { compare } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("compare", () => {
  test.each([
    [5, "=", "5", true],
    [5, "=", 5, true],
    [NaN, "=", NaN, true],
    [null, "=", undefined, true],
    [null, "=", "", true],
    [new Date(2002, 9, 2, 0, 6), "=", new Date(2002, 9, 2, 0, 6), true],
    [{}, "=", {}, true],
    [[], "=", null, true],
    [5, "=", 6, false],
    [NaN, "=", 0, false],
    [5, "==", "5", true],
    ["test", "==", "test", true],
    [true, "==", true, true],
    [false, "==", false, true],
    [new Date(2002, 9, 2, 0, 6), "==", new Date(2002, 9, 2, 0, 6), false],
    [{}, "==", {}, false],
    [[], "==", [], false],
    [5, "==", 6, false],
    [5, "===", 5, true],
    ["test", "===", "test", true],
    [true, "===", true, true],
    [false, "===", false, true],
    [5, "===", "5", false],
    [new Date(2002, 9, 2, 0, 6), "===", new Date(2002, 9, 2, 0, 6), false],
    [{}, "===", {}, false],
    [[], "===", [], false],
    [5, "===", 6, false],
    [5, "!=", "6", true],
    ["test", "!=", "TEST", true],
    [true, "!=", false, true],
    [5, "!=", "5", false],
    ["test", "!=", "test", false],
    [true, "!=", true, false],
    [5, "!==", "5", true],
    ["test", "!==", "TEST", true],
    [true, "!==", false, true],
    [5, "!==", 5, false],
    ["test", "!==", "test", false],
    [true, "!==", true, false],
    [3, "<", 5, true],
    ["apple", "<", "banana", true],
    [5, "<", 3, false],
    ["banana", "<", "apple", false],
    [5, "<", 5, false],
    [Symbol(), "<", Symbol(), false],
    [null, "<", null, false],
    [3, "<=", 5, true],
    [5, "<=", 5, true],
    ["apple", "<=", "banana", true],
    ["apple", "<=", "apple", true],
    [5, "<=", 3, false],
    ["banana", "<=", "apple", false],
    [null, "<=", null, false],
    [NaN, "<=", NaN, false],
    [8, "<=", NaN, false],
    [8, "<=", Symbol(), false],
    [5, ">", 3, true],
    ["banana", ">", "apple", true],
    [BigInt(10), ">", 5, true],
    [3, ">", 5, false],
    ["apple", ">", "banana", false],
    [5, ">", 5, false],
    [Symbol(), ">", Symbol(), false],
    [5, ">=", 3, true],
    [5, ">=", 5, true],
    ["banana", ">=", "apple", true],
    ["apple", ">=", "apple", true],
    [3, ">=", 5, false],
    ["apple", ">=", "banana", false],
    [true, "!", false, true],
    [false, "!", true, true],
    [1, "!", 0, true],
    [0, "!", 1, true],
    [true, "!", true, false],
    [false, "!", false, false],
    [true, "!!", true, true],
    [false, "!!", false, true],
    [1, "!!", 42, true],
    [0, "!!", null, true],
    [true, "!!", false, false],
    [false, "!!", true, false],
    ["non-empty", "filled", undefined, true],
    [[1, 2, 3], "filled", undefined, true],
    [
      {
        key: "value",
      },
      "filled",
      undefined,
      true,
    ],
    ["", "filled", undefined, false],
    [[], "filled", undefined, false],
    [{}, "filled", undefined, false],
    [null, "filled", undefined, false],
    [undefined, "filled", undefined, false],
    ["", "empty", undefined, true],
    [[], "empty", undefined, true],
    [{}, "empty", undefined, true],
    [null, "empty", undefined, true],
    [undefined, "empty", undefined, true],
    ["non-empty", "empty", undefined, false],
    [[1, 2, 3], "empty", undefined, false],
    [
      {
        key: "value",
      },
      "empty",
      undefined,
      false,
    ],
  ] as const)("compares %s %s %s as %s", (left, operator, right, expected) => {
    const result = compare(left, operator, right);
    expect(result).toBe(expected);
    expectTypeOf(result).toEqualTypeOf<boolean>();
  });

  test("throws error for unknown operator", () => {
    expect(() => {
      return compare(5, "unknown" as any, 5);
    }).toThrow("Unknown operator 'unknown'");
  });

  test("function operator", () => {
    const isGreaterThan = (a: unknown, b: unknown) => {
      if (isNumber(a) && isNumber(b)) {
        return a > b;
      }

      return false;
    };

    expect(compare(5, isGreaterThan, 3)).toBe(true);
    expect(compare(3, isGreaterThan, 5)).toBe(false);
  });

  test("custom operators", () => {
    const customOperators = {
      startsWithA: (a: unknown) => {
        return isString(a) && a.startsWith("A");
      },
      isEven: (a: unknown) => {
        return isNumber(a) && a % 2 === 0;
      },
      alwaysTrue: true,
      alwaysFalse: false,
    };

    expect(compare("Apple", "startsWithA", undefined, customOperators)).toBe(true);
    expect(compare("Banana", "startsWithA", undefined, customOperators)).toBe(false);
    expect(compare(4, "isEven", undefined, customOperators)).toBe(true);
    expect(compare(5, "isEven", undefined, customOperators)).toBe(false);
    expect(compare(42, "alwaysTrue", undefined, customOperators)).toBe(true);
    expect(compare(42, "alwaysFalse", undefined, customOperators)).toBe(false);
  });

  test("can disable specific operators", () => {
    const customOperators = {
      "==": null,
      filled: undefined,
    };

    expect(compare(5, "===", 5, customOperators)).toBe(true);
    expect(() => {
      // @ts-expect-error

      return compare(5, "==", 5, customOperators);
    }).toThrow(/disabled/);
    expect(() => {
      // @ts-expect-error Disabled operators are rejected statically too.
      return compare("test", "filled", undefined, customOperators);
    }).toThrow(/disabled/);
  });

  test("accepts callable custom operators", () => {
    const operator = {
      offset: 2,
      [callable](left: unknown, right: unknown) {
        return Number(left) + this.offset === right;
      },
    };

    expect(compare(2, operator, 4)).toBe(true);
    expect(
      compare(2, "custom", 4, {
        custom: operator,
      }),
    ).toBe(true);
  });
});
