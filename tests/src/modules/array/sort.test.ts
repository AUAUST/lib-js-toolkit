import { describe, expect, expectTypeOf, test } from "vitest";

import { sort } from "@auaust/toolkit/array";

describe("sort", () => {
  test("sorts in place and returns its input", () => {
    const array = [10, 9, 1];
    const result = sort(array);

    expect(result).toBe(array);
    expect(result).toEqual([1, 10, 9]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
    expect(sort(array, (left, right) => left - right)).toEqual([1, 9, 10]);
  });

  test("never passes undefined to the comparator", () => {
    const array = [2, undefined, 1];

    expect(
      sort(array, (left, right) => {
        expectTypeOf(left).toEqualTypeOf<number>();

        return left - right;
      }),
    ).toEqual([1, 2, undefined]);
  });

  test("keeps the native string order by default", () => {
    expect(sort([10, 1, 32])).toEqual([1, 10, 32]);
  });

  test("reverses in one pass", () => {
    expect(sort([10, 9, 1], { reverse: true })).toEqual([9, 10, 1]);

    expect(sort(["b", undefined, "a"], { reverse: true })).toEqual([
      "b",
      "a",
      undefined,
    ]);
  });

  test("negates a comparator, keeping ties in source order", () => {
    const items = [
      { rank: 1, name: "a" },
      { rank: 2, name: "b" },
      { rank: 1, name: "c" },
    ];

    expect(
      sort(items, (left, right) => left.rank - right.rank, { reverse: true }),
    ).toEqual([
      { rank: 2, name: "b" },
      { rank: 1, name: "a" },
      { rank: 1, name: "c" },
    ]);
  });

  test("passes nullish through", () => {
    expect(sort(null)).toBeUndefined();
  });
});
