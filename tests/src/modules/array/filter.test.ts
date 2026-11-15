import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { filter } from "@auaust/toolkit/array";
import { isString } from "@auaust/toolkit/guard";
import type { Maybe } from "@auaust/toolkit/types";

describe("filter", () => {
  test("keeps accepted items in a new array, passing each index", () => {
    const source = [1, 2, 3, 4];
    const predicate = vi.fn((value: number) => value % 2 === 0);
    const result = filter(source, predicate);

    expect(result).toEqual([2, 4]);
    expect(source).toEqual([1, 2, 3, 4]);
    expect(predicate).toHaveBeenNthCalledWith(3, 3, 2, source);
  });

  test("narrows with a type predicate and accepts readonly arrays", () => {
    const result = filter([1, "a"], isString);

    expect(result).toEqual(["a"]);
    expectTypeOf(result).toEqualTypeOf<string[]>();
    expectTypeOf(filter([1, 2] as const, Boolean)).toEqualTypeOf<(1 | 2)[]>();
  });

  test("narrows with a guard wider than the item type", () => {
    const items = [1, "a"] as (1 | "a")[];

    expectTypeOf(filter(items, isString)).toEqualTypeOf<"a"[]>();

    filter(items, (value): value is 1 => {
      expectTypeOf(value).toEqualTypeOf<1 | "a">();

      return value === 1;
    });
  });

  test("keeps items whose named member is truthy", () => {
    const items = [
      { active: true, id: 1 },
      { active: false, id: 2 },
    ];

    expect(filter(items, "active")).toEqual([items[0]]);

    const union: ({ id: number } | { id: number; active: boolean })[] = [];

    // @ts-expect-error `active` is missing from one member of the union
    filter(union, "active");
  });

  test("passes nullish through and rejects invalid predicates", () => {
    expect(filter(null, Boolean)).toBeUndefined();
    expect(() => filter([1], true as never)).toThrow(TypeError);

    expectTypeOf(filter([1] as Maybe<number[]>, Boolean)).toEqualTypeOf<
      number[] | undefined
    >();
  });
});
