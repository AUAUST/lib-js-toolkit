import { describe, expect, expectTypeOf, test } from "vitest";

import { insert } from "@auaust/toolkit/maplike";

describe("insert", () => {
  test("sets a free key and returns the map", () => {
    const map = new Map<string, number>();
    const result = insert(map, "a", 1);

    expect(result).toBe(map);
    expect(map.get("a")).toBe(1);
    expectTypeOf(result).toEqualTypeOf<Map<string, number>>();
  });

  test("throws a TypeError naming a taken key and keeps its value", () => {
    const map = new Map([["a", 1]]);

    expect(() => insert(map, "a", 2)).toThrow(
      new TypeError('Key "a" is already set.'),
    );

    expect(map.get("a")).toBe(1);
  });
});
