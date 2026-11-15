import { describe, expect, expectTypeOf, test } from "vitest";

import { toShuffled } from "@auaust/toolkit/array";

describe("toShuffled", () => {
  test("copies the same items, leaving the input unchanged", () => {
    const tuple = [1, 2, 3, 4, 5] as const;
    const result = toShuffled(tuple);

    expect(result).not.toBe(tuple);
    expect(result.toSorted()).toEqual([1, 2, 3, 4, 5]);
    expect(tuple).toEqual([1, 2, 3, 4, 5]);
    expectTypeOf(result).toEqualTypeOf<(1 | 2 | 3 | 4 | 5)[]>();
  });

  test("gives an empty array for an empty array", () => {
    expect(toShuffled([])).toEqual([]);
  });
});
