import { getOrSet } from "@auaust/toolkit/object";
import { callable } from "@auaust/toolkit/protocols/callable";
import { expect, expectTypeOf, test, vi } from "vitest";

test("getOrSet() infers and stores fallbacks only for absent properties", () => {
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
  expectTypeOf(getOrSet({}, "literal", "fallback" as const)).toEqualTypeOf<"fallback">();
});

test("getOrSet() retains present undefined, null, falsy, and inherited values", () => {
  const target = {
    missing: undefined,
    empty: null,
    zero: 0,
    no: false,
  };
  const fallback = vi.fn(() => 1);

  expectTypeOf(getOrSet(target, "missing", fallback)).toEqualTypeOf<undefined>();

  expect(getOrSet(target, "missing", fallback)).toBeUndefined();
  expect(getOrSet(target, "empty", fallback)).toBeNull();
  expect(getOrSet(target, "zero", fallback)).toBe(0);
  expect(getOrSet(target, "no", fallback)).toBe(false);
  expect(getOrSet(target, "toString", fallback)).toBe(Object.prototype.toString);
  expect(fallback).not.toHaveBeenCalled();
});

test("getOrSet() resolves callable fallbacks and includes optional property types", () => {
  const key = Symbol("key");
  const target: { value?: number } = {};
  const fallback = {
    prefix: "entry",
    [callable](input: symbol) {
      return `${this.prefix}:${input.description}`;
    },
  };

  expectTypeOf(getOrSet(target, "value", "fallback" as const))
    .toEqualTypeOf<number | undefined | "fallback">();

  const result = getOrSet({}, key, fallback);

  expectTypeOf(result).toEqualTypeOf<string>();

  expect(result).toBe("entry:key");
});
