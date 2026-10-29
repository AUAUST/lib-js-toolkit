import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { getOrSet } from "@auaust/toolkit/object";
import { callable } from "@auaust/toolkit/protocol";

import { createObjects } from "../../fixtures/values";

describe("getOrSet", () => {
  test.for(createObjects())("accepts native target %s", (target) => {
    const fallback = vi.fn(() => "value" as const);
    const result = getOrSet(target, "fixture", fallback);

    expect(result).toBe("value");
    expect(getOrSet(target, "fixture", fallback)).toBe(result);
    expect(fallback).toHaveBeenCalledExactlyOnceWith("fixture");
    expectTypeOf(result).toEqualTypeOf<"value">();
  });

  test("infers and stores fallbacks only for absent properties", () => {
    const target = {};
    const fallback = vi.fn((key: "count") => key.length);
    const result = getOrSet(target, "count", fallback);

    expectTypeOf(result).toEqualTypeOf<number>();
    expect(result).toBe(5);

    expect(target).toEqual({
      count: 5,
    });

    expect(getOrSet(target, "count", fallback)).toBe(5);
    expect(fallback).toHaveBeenCalledExactlyOnceWith("count");

    expectTypeOf(
      getOrSet({}, "literal", "fallback" as const),
    ).toEqualTypeOf<"fallback">();
  });

  test("retains present undefined, null, falsy, and inherited values", () => {
    const target = {
      missing: undefined,
      empty: null,
      zero: 0,
      no: false,
    };

    const fallback = vi.fn(() => 1);

    expectTypeOf(
      getOrSet(target, "missing", fallback),
    ).toEqualTypeOf<undefined>();

    expect(getOrSet(target, "missing", fallback)).toBeUndefined();
    expect(getOrSet(target, "empty", fallback)).toBeNull();
    expect(getOrSet(target, "zero", fallback)).toBe(0);
    expect(getOrSet(target, "no", fallback)).toBe(false);

    expect(getOrSet(target, "toString", fallback)).toBe(
      Object.prototype.toString,
    );

    expect(fallback).not.toHaveBeenCalled();
  });

  test("resolves callable fallbacks and includes optional property types", () => {
    const key = Symbol("key");
    const target: { value?: number } = {};

    const fallback = {
      prefix: "entry",
      [callable](input: symbol) {
        return `${this.prefix}:${input.description}`;
      },
    };

    expectTypeOf(getOrSet(target, "value", "fallback" as const)).toEqualTypeOf<
      number | undefined | "fallback"
    >();

    const result = getOrSet({}, key, fallback);

    expectTypeOf(result).toEqualTypeOf<string>();
    expect(result).toBe("entry:key");
  });
});
