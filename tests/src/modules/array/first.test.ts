import { describe, expect, expectTypeOf, test } from "vitest";

import { first } from "@auaust/toolkit/array";

describe("first", () => {
  test("returns the first item", () => {
    const result = first([1, 2]);

    expect(result).toBe(1);
    expectTypeOf(result).toEqualTypeOf<number | undefined>();
  });

  test("returns undefined for an empty array, a hole or nullish", () => {
    const sparse: number[] = [];

    sparse[1] = 1;

    expect(first(sparse)).toBeUndefined();
    expect(first([])).toBeUndefined();
    expect(first(null)).toBeUndefined();
  });
});
