import { compare } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("compare()", () => {
  test("= operator", () => {
    expect(compare(5, "=", "5")).toBe(true);
    expect(compare(5, "=", 5)).toBe(true);
    expect(compare(NaN, "=", NaN)).toBe(true);
    expect(compare(null, "=", undefined)).toBe(true);
    expect(compare(null, "=", "")).toBe(true);
    expect(compare(new Date(), "=", new Date())).toBe(true);
    expect(compare({}, "=", {})).toBe(true);
    expect(compare([], "=", null)).toBe(true);

    expect(compare(5, "=", 6)).toBe(false);
    expect(compare(NaN, "=", 0)).toBe(false);
  });

  test("== operator", () => {
    expect(compare(5, "==", "5")).toBe(true);
    expect(compare("test", "==", "test")).toBe(true);
    expect(compare(true, "==", true)).toBe(true);
    expect(compare(false, "==", false)).toBe(true);

    expect(compare(new Date(), "==", new Date())).toBe(false);
    expect(compare({}, "==", {})).toBe(false);
    expect(compare([], "==", [])).toBe(false);
    expect(compare(5, "==", 6)).toBe(false);
  });

  test("=== operator", () => {
    expect(compare(5, "===", 5)).toBe(true);
    expect(compare("test", "===", "test")).toBe(true);
    expect(compare(true, "===", true)).toBe(true);
    expect(compare(false, "===", false)).toBe(true);

    expect(compare(5, "===", "5")).toBe(false);
    expect(compare(new Date(), "===", new Date())).toBe(false);
    expect(compare({}, "===", {})).toBe(false);
    expect(compare([], "===", [])).toBe(false);
    expect(compare(5, "===", 6)).toBe(false);
  });

  test("!= operator", () => {
    expect(compare(5, "!=", "6")).toBe(true);
    expect(compare("test", "!=", "TEST")).toBe(true);
    expect(compare(true, "!=", false)).toBe(true);

    expect(compare(5, "!=", "5")).toBe(false);
    expect(compare("test", "!=", "test")).toBe(false);
    expect(compare(true, "!=", true)).toBe(false);
  });

  test("!== operator", () => {
    expect(compare(5, "!==", "5")).toBe(true);
    expect(compare("test", "!==", "TEST")).toBe(true);
    expect(compare(true, "!==", false)).toBe(true);

    expect(compare(5, "!==", 5)).toBe(false);
    expect(compare("test", "!==", "test")).toBe(false);
    expect(compare(true, "!==", true)).toBe(false);
  });

  test("< operator", () => {
    expect(compare(3, "<", 5)).toBe(true);
    expect(compare("apple", "<", "banana")).toBe(true);

    expect(compare(5, "<", 3)).toBe(false);
    expect(compare("banana", "<", "apple")).toBe(false);
    expect(compare(5, "<", 5)).toBe(false);

    expect(compare(Symbol(), "<", Symbol())).toBe(false);
    expect(compare(null, "<", null)).toBe(false);
  });

  test("<= operator", () => {
    expect(compare(3, "<=", 5)).toBe(true);
    expect(compare(5, "<=", 5)).toBe(true);
    expect(compare("apple", "<=", "banana")).toBe(true);
    expect(compare("apple", "<=", "apple")).toBe(true);

    expect(compare(5, "<=", 3)).toBe(false);
    expect(compare("banana", "<=", "apple")).toBe(false);

    expect(compare(null, "<=", null)).toBe(false);
    expect(compare(NaN, "<=", NaN)).toBe(false);

    expect(compare(8, "<=", NaN)).toBe(false);
    expect(compare(8, "<=", Symbol())).toBe(false);
  });

  test("> operator", () => {
    expect(compare(5, ">", 3)).toBe(true);
    expect(compare("banana", ">", "apple")).toBe(true);
    expect(compare(BigInt(10), ">", 5)).toBe(true);

    expect(compare(3, ">", 5)).toBe(false);
    expect(compare("apple", ">", "banana")).toBe(false);
    expect(compare(5, ">", 5)).toBe(false);

    expect(compare(Symbol(), ">", Symbol())).toBe(false);
  });

  test(">= operator", () => {
    expect(compare(5, ">=", 3)).toBe(true);
    expect(compare(5, ">=", 5)).toBe(true);
    expect(compare("banana", ">=", "apple")).toBe(true);
    expect(compare("apple", ">=", "apple")).toBe(true);

    expect(compare(3, ">=", 5)).toBe(false);
    expect(compare("apple", ">=", "banana")).toBe(false);
  });

  test("! operator", () => {
    expect(compare(true, "!", false)).toBe(true);
    expect(compare(false, "!", true)).toBe(true);
    expect(compare(1, "!", 0)).toBe(true);
    expect(compare(0, "!", 1)).toBe(true);

    expect(compare(true, "!", true)).toBe(false);
    expect(compare(false, "!", false)).toBe(false);
  });

  test("!! operator", () => {
    expect(compare(true, "!!", true)).toBe(true);
    expect(compare(false, "!!", false)).toBe(true);
    expect(compare(1, "!!", 42)).toBe(true);
    expect(compare(0, "!!", null)).toBe(true);

    expect(compare(true, "!!", false)).toBe(false);
    expect(compare(false, "!!", true)).toBe(false);
  });

  test("filled operator", () => {
    expect(compare("non-empty", "filled")).toBe(true);
    expect(compare([1, 2, 3], "filled")).toBe(true);
    expect(compare({ key: "value" }, "filled")).toBe(true);

    expect(compare("", "filled")).toBe(false);
    expect(compare([], "filled")).toBe(false);
    expect(compare({}, "filled")).toBe(false);
    expect(compare(null, "filled")).toBe(false);
    expect(compare(undefined, "filled")).toBe(false);
  });

  test("empty operator", () => {
    expect(compare("", "empty")).toBe(true);
    expect(compare([], "empty")).toBe(true);
    expect(compare({}, "empty")).toBe(true);
    expect(compare(null, "empty")).toBe(true);
    expect(compare(undefined, "empty")).toBe(true);

    expect(compare("non-empty", "empty")).toBe(false);
    expect(compare([1, 2, 3], "empty")).toBe(false);
    expect(compare({ key: "value" }, "empty")).toBe(false);
  });

  test("throws error for unknown operator", () => {
    expect(() => compare(5, "unknown" as any, 5)).toThrowError(
      "Unknown operator: unknown"
    );
  });

  test("function operator", () => {
    const isGreaterThan = (a: unknown, b: unknown) => {
      if (typeof a === "number" && typeof b === "number") {
        return a > b;
      }
      return false;
    };

    expect(compare(5, isGreaterThan, 3)).toBe(true);
    expect(compare(3, isGreaterThan, 5)).toBe(false);
  });

  test("custom operators", () => {
    const customOperators = {
      startsWithA: (a: unknown) => typeof a === "string" && a.startsWith("A"),
      isEven: (a: unknown) => typeof a === "number" && a % 2 === 0,
      alwaysTrue: true,
      alwaysFalse: false,
    };

    expect(compare("Apple", "startsWithA", undefined, customOperators)).toBe(
      true
    );
    expect(compare("Banana", "startsWithA", undefined, customOperators)).toBe(
      false
    );
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

    // @ts-expect-error
    expect(() => compare(5, "==", 5, customOperators)).toThrowError(/disabled/);

    expect(() =>
      // @ts-expect-error
      compare("test", "filled", undefined, customOperators)
    ).toThrowError(/disabled/);
  });
});
