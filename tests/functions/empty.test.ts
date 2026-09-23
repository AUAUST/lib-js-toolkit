import { empty } from "@auaust/toolkit";
import { isEmpty } from "@auaust/toolkit/protocols/emptiable";
import { describe, expect, test } from "vitest";

describe("empty()", () => {
  test("returns true for empty values", () => {
    expect(empty("")).toBe(true);
    expect(empty([])).toBe(true);
    expect(empty({})).toBe(true);
    expect(empty(null)).toBe(true);
    expect(empty(undefined)).toBe(true);
    expect(empty(new Map())).toBe(true);
    expect(empty(new Set())).toBe(true);
  });

  test("returns false for non-empty values", () => {
    expect(empty("non-empty")).toBe(false);
    expect(empty([1, 2, 3])).toBe(false);
    expect(empty({ key: "value" })).toBe(false);
    expect(empty(42)).toBe(false);
    expect(empty(0)).toBe(false);
    expect(empty(NaN)).toBe(false);
    expect(empty(new Map([["key", "value"]]))).toBe(false);
    expect(empty(new Set([1, 2, 3]))).toBe(false);
  });

  test("supports the `Emptiable` protocol", () => {
    const value: any = {
      value: 1,
    };

    expect(empty(value)).toBe(false);

    value[isEmpty] = function (this: any) {
      return this.value === 0;
    };

    expect(empty(value)).toBe(false);

    value.value = 0;

    expect(empty(value)).toBe(true);
  });
});
