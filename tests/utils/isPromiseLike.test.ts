import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { isPromiseLike } from "@auaust/toolkit";
import { isPromiseLike as subpathIsPromiseLike } from "@auaust/toolkit/isPromiseLike";
import { callable } from "@auaust/toolkit/protocols/callable";

import { createFunctions, primitiveValues } from "../fixtures/values";

describe("isPromiseLike", () => {
  test("recognizes native promises and exposes the same subpath guard", () => {
    expect(isPromiseLike).toBe(subpathIsPromiseLike);
    expect(isPromiseLike(Promise.resolve(42))).toBe(true);
  });

  test("recognizes own, inherited, and function thenables without invoking then", () => {
    const then = vi.fn();

    const thenable = {
      then,
    };

    const inherited: unknown = Object.create(thenable);

    const functionThenable = Object.assign(() => {}, {
      then,
    });

    expect(isPromiseLike(thenable)).toBe(true);
    expect(isPromiseLike(inherited)).toBe(true);
    expect(isPromiseLike(functionThenable)).toBe(true);
    expect(then).not.toHaveBeenCalled();
  });

  test.for([
    ...primitiveValues,
    ...createFunctions(),
    {},
    {
      then: 42,
    },
    {
      then: {
        [callable]() {},
      },
    },
  ])("rejects values without a function-valued then property: %s", (input) => {
    expect(isPromiseLike(input)).toBe(false);
  });

  test("narrows unknown inputs and preserves known fulfillment types", () => {
    const unknownInput: unknown = Promise.resolve(42);
    const knownInput = Promise.resolve(42) as number | PromiseLike<number>;

    if (isPromiseLike(unknownInput)) {
      expectTypeOf(unknownInput).toEqualTypeOf<PromiseLike<unknown>>();
    } else {
      expect.unreachable("The promise should be recognized.");
    }

    if (isPromiseLike(knownInput)) {
      expectTypeOf(knownInput).toEqualTypeOf<PromiseLike<number>>();
    } else {
      expectTypeOf(knownInput).toEqualTypeOf<number>();
      expect.unreachable("The promise should be recognized.");
    }
  });
});
