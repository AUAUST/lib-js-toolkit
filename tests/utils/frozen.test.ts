import { describe, expect, expectTypeOf, test } from "vitest";

import { frozen } from "@auaust/toolkit";

describe("frozen", () => {
  test("returns a frozen shallow copy of the object", () => {
    const object = {
      a: 1,
      nested: {
        b: 2,
      },
    };

    const result = frozen(object);

    expect(Object.isFrozen(result)).toBe(true);
    expect(result).not.toBe(object);
    expect(result).toEqual(object);
    expect(Object.isFrozen(result.nested)).toBe(false);
    expect(result.nested).toEqual(object.nested);
  });

  test("returns a frozen shallow copy of an array", () => {
    const array = [1, [2, 3]];
    const result = frozen(array);

    expect(Object.isFrozen(result)).toBe(true);
    expect(result).not.toBe(array);
    expect(result).toEqual(array);
    expect(Object.isFrozen(result[1])).toBe(false);
    expect(result[1]).toEqual(array[1]);
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
