import { mappedValues } from "@auaust/toolkit";
import { describe, expect, expectTypeOf, test } from "vitest";

describe("mappedValues()", () => {
  test("returns a copy with transformed values", () => {
    const source = {
      a: 1,
      b: 2,
    };

    const calls: unknown[][] = [];
    const result = mappedValues(source, (value, key, sourceKey) => {
      calls.push([value, key, sourceKey]);
      return `${String(key)}:${value}`;
    });

    expect(result).toEqual({
      a: "a:1",
      b: "b:2",
    });

    expect(result).not.toBe(source);

    expect(source).toEqual({
      a: 1,
      b: 2,
    });

    expect(calls).toEqual([
      [1, "a", "a"],
      [2, "b", "b"],
    ]);

    expectTypeOf(result).toEqualTypeOf<{ a: string; b: string }>();
  });

  test("uses Object.keys semantics for arrays", () => {
    const result = mappedValues([1, 2, 3], (value) => {
      return Number(value) * 2;
    });

    expect(result).toEqual({
      0: 2,
      1: 4,
      2: 6,
    });

    expect(Array.isArray(result)).toBe(false);
  });
});
