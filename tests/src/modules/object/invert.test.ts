import { describe, expect, expectTypeOf, test } from "vitest";

import { invert } from "@auaust/toolkit/object";

describe("invert", () => {
  test("swaps keys and values, stringifying primitives and skipping nullish values", () => {
    const result = invert({
      a: "x",
      b: true,
      c: 1n,
      d: null,
    } as const);

    expect(result).toEqual({
      x: "a",
      true: "b",
      1: "c",
    });

    expectTypeOf(result).toEqualTypeOf<{ "x": "a"; "true": "b"; "1": "c" }>();

    expectTypeOf(invert({ a: "x", b: 1 } as const)).toEqualTypeOf<{
      "x": "a";
      "1": "b";
    }>();
  });

  test("keeps a symbol value as a symbol key", () => {
    const key = Symbol("key");

    expect(invert({ a: key })[key]).toBe("a");
  });

  test("keeps the last key for a repeated value", () => {
    expect(invert({ a: "x", b: "x" })).toEqual({ x: "b" });
  });

  test("throws on an object value", () => {
    expect(() => {
      return invert({
        a: {},
      });
    }).toThrow(TypeError);
  });
});
