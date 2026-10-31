import { describe, expect, expectTypeOf, test } from "vitest";

import { applyMethod, call, callMethod } from "@auaust/toolkit";
import { isCallable } from "@auaust/toolkit/guard";
import { callable } from "@auaust/toolkit/protocol";

import {
  createFunctions,
  createObjects,
  primitiveValues,
} from "../../fixtures/values";

describe("isCallable", () => {
  test.for(createFunctions())("recognizes function %s", (input) => {
    expect(isCallable(input)).toBe(true);
    expectTypeOf(isCallable(input)).toEqualTypeOf<boolean>();
  });

  test.for([...primitiveValues, ...createObjects()])(
    "rejects non-callable %s",
    (input) => {
      expect(isCallable(input)).toBe(false);
    },
  );

  test("returns `true` for objects that implement the `Callable` protocol", () => {
    expect(
      isCallable({
        [callable]: () => {},
      }),
    ).toBe(true);

    expect(
      isCallable({
        get [callable]() {
          return () => {};
        },
      }),
    ).toBe(true);
  });

  test("supports passing a method name", () => {
    const object = {
      method(...nums: number[]) {
        return nums.reduce((sum, number_) => sum + number_, 0);
      },
    } as unknown;

    expect(isCallable(object, "method")).toBe(true);
    expect(isCallable(object, "nonExistentMethod")).toBe(false);

    if (!isCallable(object, "method")) {
      return;
    }

    // Arguments cannot be inferred at runtime from an unknown input,
    // so the guard should allow unknown args
    expect(call(object.method)).toBe(0);
    expect(call(object.method, 1, 2, 3)).toBe(6);
    expect(callMethod(object, "method", 5)).toBe(5);
    expect(applyMethod(object, "method", [1, 2, 3])).toBe(6);
  });

  test("supports passing a method symbol", () => {
    const methodSymbol = Symbol("method");

    const object = {
      [methodSymbol]() {
        return 1;
      },
    } as unknown;

    expect(isCallable(object, methodSymbol)).toBe(true);
    expect(isCallable(object, Symbol("nonExistentMethod"))).toBe(false);

    if (isCallable(object, methodSymbol)) {
      expect(call(object[methodSymbol])).toBe(1);
    }
  });
});
