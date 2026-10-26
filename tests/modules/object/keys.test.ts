import { describe, expect, expectTypeOf, test } from "vitest";

import { keys } from "@auaust/toolkit/object";

describe("keys", () => {
  test("infers string keys and excludes symbols", () => {
    const result = keys({
      name: "entry",
      1: true,
      [Symbol()]: 2,
    });

    expectTypeOf(result).toEqualTypeOf<("1" | "name")[]>();
    expectTypeOf(keys([1, 2])).toEqualTypeOf<`${number}`[]>();
    expect(keys).toBe(Object.keys);
    expect(result).toEqual(["1", "name"]);
    expect(keys({})).toEqual([]);
  });

  test("handles unions, optional properties, readonly tuples, and strings", () => {
    const target = {} as { first?: number } | { second: string };
    const tuple = [1, "entry"] as const;

    expectTypeOf(keys(target)).toEqualTypeOf<("first" | "second")[]>();
    expectTypeOf(keys(tuple)).toEqualTypeOf<`${number}`[]>();
    expectTypeOf(keys("ab")).toEqualTypeOf<`${number}`[]>();
    expectTypeOf(keys({})).toEqualTypeOf<never[]>();
    expectTypeOf(
      keys({
        [Symbol()]: true,
      }),
    ).toEqualTypeOf<never[]>();
    expect(keys(tuple)).toEqual(["0", "1"]);
    expect(keys("ab")).toEqual(["0", "1"]);
  });
});
