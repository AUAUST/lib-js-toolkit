import { transformValues } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("transformValues()", () => {
  test("transforms values on the original object", () => {
    const target = {
      a: 1,
      b: 2,
    };

    const calls: unknown[][] = [];

    const result = transformValues(target, (value, key, sourceKey) => {
      calls.push([value, key, sourceKey]);
      return `${String(key)}:${value}`;
    });

    expect(result).toBe(target);

    expect(target).toEqual({
      a: "a:1",
      b: "b:2",
    });

    expect(calls).toEqual([
      [1, "a", "a"],
      [2, "b", "b"],
    ]);

    expectTypeOf(result).toEqualTypeOf<{ a: string; b: string }>();
  });

  test("supports objects with a null prototype", () => {
    const target = Object.assign(Object.create(null), {
      value: 2,
    }) as {
      value: number;
    };

    transformValues(target, (value) => value * 3);

    expect(target.value).toBe(6);

    expect(target).toEqual({
      value: 6,
    });
  });
});
