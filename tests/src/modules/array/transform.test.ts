import { describe, expect, expectTypeOf, test } from "vitest";

import { transform } from "@auaust/toolkit/array";

describe("transform", () => {
  test("maps each item in place and returns the same array", () => {
    const items = [1, 2, 3];
    const result = transform(items, (value) => value * 2);

    expect(result).toBe(items);
    expect(items).toEqual([2, 4, 6]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  test("calls a method by name on each item", () => {
    const items = ["a", "b"];

    expect(transform(items, "toUpperCase")).toBe(items);
    expect(items).toEqual(["A", "B"]);
  });

  test("keeps holes and rejects non-arrays", () => {
    const sparse = [1];

    sparse[2] = 3;
    transform(sparse, (value) => value + 1);

    expect(1 in sparse).toBe(false);
    expect(sparse[2]).toBe(4);
    expect(() => transform(new Set([1]) as never, String)).toThrow(TypeError);
    expect(transform(null, String)).toBeUndefined();

    const readonlyItems: readonly number[] = [1];

    // @ts-expect-error a readonly array cannot be mutated
    transform(readonlyItems, String);
  });
});
