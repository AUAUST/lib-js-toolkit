import { describe, expect, expectTypeOf, test } from "vitest";

import { insert } from "@auaust/toolkit/setlike";

describe("insert", () => {
  test("adds a new value and returns the set", () => {
    const set = new Set<number>();
    const result = insert(set, 1);

    expect(result).toBe(set);
    expect(set.has(1)).toBe(true);
    expectTypeOf(result).toEqualTypeOf<Set<number>>();
  });

  test("throws a TypeError naming a value already present, NaN included", () => {
    expect(() => insert(new Set([NaN]), NaN)).toThrow(
      new TypeError('Value "NaN" is already in the set.'),
    );
  });
});
