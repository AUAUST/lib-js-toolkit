import { applyMethod, call, callMethod, isCallable } from "@auaust/toolkit";
import { callable } from "@auaust/toolkit/protocols/callable";
import { describe, expect, test } from "vitest";

describe("isCallable()", () => {
  test("returns `true` for functions", () => {
    expect(isCallable(() => {})).toBe(true);
    expect(isCallable(function () {})).toBe(true);
    expect(isCallable(async function () {})).toBe(true);
    expect(isCallable(class {})).toBe(true);
  });

  test("returns `true` for objects that implement the `Callable` protocol", () => {
    expect(isCallable({ [callable]: () => {} })).toBe(true);

    expect(
      isCallable({
        get [callable]() {
          return () => {};
        },
      }),
    ).toBe(true);
  });

  test("returns `false` for non-callable values", () => {
    expect(isCallable(null)).toBe(false);
    expect(isCallable(undefined)).toBe(false);
    expect(isCallable(123)).toBe(false);
    expect(isCallable("string")).toBe(false);
    expect(isCallable({})).toBe(false);
  });

  test("supports passing a method name", () => {
    const obj = {
      method(...nums: number[]) {
        return nums.reduce((sum, num) => sum + num, 0);
      },
    } as unknown;

    expect(isCallable(obj, "method")).toBe(true);
    expect(isCallable(obj, "nonExistentMethod")).toBe(false);

    if (isCallable(obj, "method")) {
      // Arguments cannot be inferred at runtime from an unknown input,
      // so the guard should allow unknown args
      expect(call(obj.method)).toBe(0);
      expect(call(obj.method, 1, 2, 3)).toBe(6);
      expect(callMethod(obj, "method", 5)).toBe(5);
      expect(applyMethod(obj, "method", [1, 2, 3])).toBe(6);
    }
  });

  test("supports passing a method symbol", () => {
    const methodSymbol = Symbol("method");

    const obj = {
      [methodSymbol]() {
        return 1;
      },
    } as unknown;

    expect(isCallable(obj, methodSymbol)).toBe(true);
    expect(isCallable(obj, Symbol("nonExistentMethod"))).toBe(false);

    if (isCallable(obj, methodSymbol)) {
      expect(call(obj[methodSymbol])).toBe(1);
    }
  });
});
