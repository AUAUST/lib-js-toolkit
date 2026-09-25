import { frozen } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("frozen()", () => {
  test("returns a frozen shallow copy of the object", () => {
    const obj = {
      a: 1,
      nested: {
        b: 2,
      },
    };

    const result = frozen(obj);

    expect(Object.isFrozen(result)).toBe(true);

    expect(result).not.toBe(obj);

    expect(result).toEqual(obj);

    expect(Object.isFrozen(result.nested)).toBe(false);

    expect(result.nested).toEqual(obj.nested);
  });

  test("returns a frozen shallow copy of an array", () => {
    const arr = [1, [2, 3]];

    const result = frozen(arr);

    expect(Object.isFrozen(result)).toBe(true);

    expect(result).not.toBe(arr);

    expect(result).toEqual(arr);

    expect(Object.isFrozen(result[1])).toBe(false);

    expect(result[1]).toEqual(arr[1]);
  });

  test("freezes non-array and non-plain-objects in place", () => {
    const date = new Date();

    const result = frozen(date);

    expect(result).toBe(date);

    expect(Object.isFrozen(result)).toBe(true);
  });

  test("freezes functions", () => {
    const fn = Object.assign(() => 1, {
      value: 42,
    });

    const result = frozen(fn);

    expect(result).toBe(fn);

    expect(Object.isFrozen(result)).toBe(true);

    expectTypeOf(result).toExtend<() => number>();

    expectTypeOf(result).toExtend<{
      readonly value: number;
    }>();

    // @ts-expect-error
    expect(() => (result.value = 43)).toThrow();

    const called = result();

    expect(called).toBe(1);

    expectTypeOf(called).toBeNumber();
  });
});
