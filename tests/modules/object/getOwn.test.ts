import { describe, expect, expectTypeOf, test } from "vitest";

import { getOwn } from "@auaust/toolkit/object";

import { createObjects } from "../../fixtures/values";

describe("getOwn", () => {
  test.for(createObjects())("accepts native target %s", (target) => {
    expect(getOwn(target, "toString")).toBeUndefined();
  });

  test("retains known types and excludes inherited properties", () => {
    const target = {
      value: 1,
    };

    expectTypeOf(getOwn(target, "value")).toEqualTypeOf<number | undefined>();
    expectTypeOf(getOwn(target, "missing")).toBeAny();
    expectTypeOf(getOwn<number>(target, "value")).toEqualTypeOf<
      number | undefined
    >();
    expect(getOwn(target, "value")).toBe(1);
    expect(getOwn(target, "toString")).toBeUndefined();
    expect(getOwn(target, "missing")).toBeUndefined();
  });

  test("supports symbols and null-prototype objects", () => {
    const key = Symbol("key");

    const target = Object.assign(Object.create(null), {
      [key]: false,
    });

    expect(getOwn(target, key)).toBe(false);
    expect(getOwn(target, "toString")).toBeUndefined();
  });
});
