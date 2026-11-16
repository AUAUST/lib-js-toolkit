import { describe, expect, expectTypeOf, test } from "vitest";

import { toSortedBy } from "@auaust/toolkit/array";

describe("toSortedBy", () => {
  test("copies an iterable sorted by key, leaving it unchanged", () => {
    const first = { age: 30 };
    const second = { age: 4 };
    const set = new Set([first, second]);
    const result = toSortedBy(set, "age");

    expect(result).toEqual([first, second]);
    expect([...set]).toEqual([first, second]);
    expectTypeOf(result).toEqualTypeOf<{ age: number }[]>();
  });

  test("throws on a string", () => {
    // @ts-expect-error a string is rejected
    expect(() => toSortedBy("ab", "length")).toThrow(TypeError);
  });

  test("passes nullish through", () => {
    expect(toSortedBy(null, String)).toBeUndefined();
  });
});
