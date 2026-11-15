import { describe, expect, expectTypeOf, test } from "vitest";

import { isPrimitive } from "@auaust/toolkit/guard";
import type { Primitive } from "@auaust/toolkit/types";

import { createValues, primitiveValues } from "#tests/fixtures/values";

describe("isPrimitive", () => {
  test.for(createValues())("classifies case %# (%s)", (value) => {
    const input: unknown = value;
    const primitives: readonly unknown[] = primitiveValues;

    expect(isPrimitive(input)).toBe(primitives.includes(input));

    if (isPrimitive(input)) {
      expectTypeOf(input).toEqualTypeOf<Primitive>();
    }
  });

  test("narrows filtered values", () => {
    expectTypeOf(createValues().filter(isPrimitive)).toEqualTypeOf<
      Primitive[]
    >();
  });

  test("accepts null, undefined, bigints and symbols and rejects functions and objects", () => {
    expect([null, undefined, 1n, Symbol("s")].every(isPrimitive)).toBe(true);
    expect([() => {}, {}, []].some(isPrimitive)).toBe(false);
  });
});
