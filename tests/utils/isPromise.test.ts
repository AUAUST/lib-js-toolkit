import { describe, expect, expectTypeOf, test } from "vitest";

import { isPromise, isPromise as subpathIsPromise } from "@auaust/toolkit";

import { createFunctions, primitiveValues } from "../fixtures/values";

describe("isPromise", () => {
  test("recognizes promises and subclasses and exposes the same subpath guard", () => {
    class CustomPromise<Value> extends Promise<Value> {}

    expect(isPromise).toBe(subpathIsPromise);
    expect(isPromise(Promise.resolve(42))).toBe(true);
    expect(isPromise(CustomPromise.resolve(42))).toBe(true);
  });

  test.for([
    ...primitiveValues,
    ...createFunctions(),
    {},
    {
      // eslint-disable-next-line auaust/no-thenable
      then() {},
    },
  ])("rejects values that are not Promise instances: %s", (input) => {
    expect(isPromise(input)).toBe(false);
  });

  test("narrows unknown inputs and preserves known fulfillment types", () => {
    const unknownInput: unknown = Promise.resolve(42);
    const knownInput = Promise.resolve(42) as number | Promise<number>;

    if (isPromise(unknownInput)) {
      expectTypeOf(unknownInput).toEqualTypeOf<Promise<unknown>>();
    } else {
      expect.unreachable("The promise should be recognized.");
    }

    if (isPromise(knownInput)) {
      expectTypeOf(knownInput).toEqualTypeOf<Promise<number>>();
    } else {
      expectTypeOf(knownInput).toEqualTypeOf<number>();
      expect.unreachable("The promise should be recognized.");
    }
  });
});
