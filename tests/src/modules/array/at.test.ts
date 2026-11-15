import { describe, expect, expectTypeOf, test } from "vitest";

import { at } from "@auaust/toolkit/array";

describe("at", () => {
  test("reads an index, a negative one from the end", () => {
    const items = [1, 2, 3];

    expect(at(items, 0)).toBe(1);
    expect(at(items, -1)).toBe(3);
    expectTypeOf(at(items, 0)).toEqualTypeOf<number | undefined>();
  });

  test("returns undefined outside the array, for a hole or nullish", () => {
    const sparse: number[] = [];

    sparse.length = 1;

    expect(at(sparse, 0)).toBeUndefined();
    expect(at([1], 5)).toBeUndefined();
    expect(at(null, 0)).toBeUndefined();
  });
});
