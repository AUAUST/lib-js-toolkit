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
    const object = {
      method(...nums: number[]) {
        return nums.reduce((sum, number_) => sum + number_, 0);
      },
    } as unknown;

    expect(isFunction(object, "method")).toBe(true);
    expect(isFunction(object, "nonExistentMethod")).toBe(false);

    if (!isFunction(object, "method")) {
      return;
    }

    expect(object.method()).toBe(0);
    expect(object.method(1, 2, 3)).toBe(6);
    expectTypeOf<ReturnType<typeof object.method>>().toBeUnknown();
  });

  test("respects known methods", () => {
    const object = {
      method(...nums: number[]) {
        return nums.reduce((sum, number_) => sum + number_, 0);
      },
    };

    if (!isFunction(object, "method")) {
      return;
    }

    expect(object.method()).toBe(0);
    expect(object.method(1, 2, 3)).toBe(6);

    assertType<ReturnType<typeof object.method>>(1 + 1);
  });
});
