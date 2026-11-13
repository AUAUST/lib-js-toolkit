import { assertType, describe, expect, expectTypeOf, test } from "vitest";

import { isMethod } from "@auaust/toolkit/guard";

import { primitiveValues } from "#tests/fixtures/values";

describe("isMethod", () => {
  test("recognizes own, inherited, symbol-keyed and function-held methods", () => {
    const own = {
      method() {},
    };

    const symbol = Symbol("method");

    expect(isMethod(own, "method")).toBe(true);
    expect(isMethod(Object.create(own), "method")).toBe(true);
    expect(isMethod({ [symbol]() {} }, symbol)).toBe(true);

    expect(
      isMethod(
        Object.assign(() => {}, own),
        "method",
      ),
    ).toBe(true);
  });

  test.for([
    ...primitiveValues,
    {},
    {
      method: 42,
    },
  ])("rejects candidates without a function under the key: %s", (input) => {
    expect(isMethod(input, "method")).toBe(false);
  });

  test("rejects primitives even when their prototype holds the method", () => {
    expect(isMethod("string", "toString")).toBe(false);
  });

  test("narrows unknown to an object holding an unknown-typed method", () => {
    const object = {
      method(...nums: number[]) {
        return nums.reduce((sum, number_) => sum + number_, 0);
      },
    } as unknown;

    if (!isMethod(object, "method")) {
      expect.unreachable("The method should be recognized.");
    }

    expect(object.method(1, 2, 3)).toBe(6);
    expectTypeOf<ReturnType<typeof object.method>>().toBeUnknown();
  });

  test("keeps known methods", () => {
    const object = {
      method(...nums: number[]) {
        return nums.reduce((sum, number_) => sum + number_, 0);
      },
    };

    if (!isMethod(object, "method")) {
      expect.unreachable("The method should be recognized.");
    }

    assertType<ReturnType<typeof object.method>>(1 + 1);
  });
});
