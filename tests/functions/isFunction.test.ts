import { isFunction } from "@auaust/toolkit";
import { describe, expect, test } from "vitest";

describe("isFunction()", () => {
  test("returns `true` for functions", () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function () {})).toBe(true);
    expect(isFunction(async function () {})).toBe(true);
    expect(isFunction(class {})).toBe(true);
  });

  test("returns `false` for non-callable values", () => {
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(123)).toBe(false);
    expect(isFunction("string")).toBe(false);
    expect(isFunction({})).toBe(false);
  });

  test("supports passing a method name", () => {
    const obj = {
      method(...nums: number[]) {
        return nums.reduce((sum, num) => sum + num, 0);
      },
    } as unknown;

    expect(isFunction(obj, "method")).toBe(true);
    expect(isFunction(obj, "nonExistentMethod")).toBe(false);

    if (isFunction(obj, "method")) {
      expect(obj.method()).toBe(0);
      expect(obj.method(1, 2, 3)).toBe(6);
    }
  });
});
