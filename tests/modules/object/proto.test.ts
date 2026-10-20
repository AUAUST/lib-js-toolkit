import { proto } from "@auaust/toolkit/object";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("proto", () => {
  test("permits an explicit prototype type", () => {
    const target = {
      inherited: 1,
    };

    expectTypeOf(proto<typeof target>({})).toEqualTypeOf<typeof target | null>();
    expectTypeOf(proto({})).toBeAny();
    expect(proto(Object.create(target))).toBe(target);
    expect(proto(Object.create(null))).toBeNull();
  });

  test("returns `null` for objects with no prototype", () => {
    expect(proto(Object.create(null))).toBeNull();
  });

  test("returns the primitive wrapper prototype for primitive values", () => {
    expect(proto("string")).toBe(String.prototype);
    expect(proto(123)).toBe(Number.prototype);
    expect(proto(true)).toBe(Boolean.prototype);
  });

  test("returns `undefined` on nullish values", () => {
    expect(proto(null)).toBeUndefined();
    expect(proto(undefined)).toBeUndefined();
  });
});
