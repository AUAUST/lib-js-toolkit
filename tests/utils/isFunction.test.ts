import { assertType, describe, expect, expectTypeOf, test } from "vitest";

import { isFunction } from "@auaust/toolkit";

import {
  createFunctions,
  createObjects,
  primitiveValues,
} from "../fixtures/values";

describe("isFunction", () => {
  test.for(createFunctions())("recognizes function %s", (input) => {
    expect(isFunction(input)).toBe(true);
    expectTypeOf(isFunction(input)).toEqualTypeOf<boolean>();
  });

  test.for([...primitiveValues, ...createObjects()])(
    "rejects non-callable %s",
    (input) => {
      expect(isFunction(input)).toBe(false);
    },
  );

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
      expectTypeOf<ReturnType<typeof obj.method>>().toBeUnknown();
    }
  });

  test("respects known methods", () => {
    const obj = {
      method(...nums: number[]) {
        return nums.reduce((sum, num) => sum + num, 0);
      },
    };

    if (isFunction(obj, "method")) {
      const method = obj.method;

      expect(obj.method()).toBe(0);
      expect(obj.method(1, 2, 3)).toBe(6);

      assertType<typeof method>(obj.method);

      assertType<ReturnType<typeof method>>(1 + 1);
    }
  });
});
