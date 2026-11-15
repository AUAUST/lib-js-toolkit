import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { map } from "@auaust/toolkit/array";
import type { Maybe } from "@auaust/toolkit/types";

describe("map", () => {
  test("maps each item with its index into a new array", () => {
    const source = [1, 2, 3];
    const mapper = vi.fn((value: number, index: number) => value * 10 + index);
    const result = map(source, mapper);

    expect(result).toEqual([10, 21, 32]);
    expect(result).not.toBe(source);
    expect(source).toEqual([1, 2, 3]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  test("keeps holes and tuple lengths", () => {
    const sparse = [1];

    sparse.length = 3;

    const result = map(sparse, String);

    expect(1 in result).toBe(false);
    expect(result).toHaveLength(3);

    expectTypeOf(map([1, "a"] as const, String)).toEqualTypeOf<
      [string, string]
    >();
  });

  test("calls a method by name on each item", () => {
    const result = map(["a", "b"], "toUpperCase");

    expect(result).toEqual(["A", "B"]);
    expectTypeOf(result).toEqualTypeOf<string[]>();
    expect(map(["a", "bc"], "padStart", 3, "-")).toEqual(["--a", "-bc"]);
  });

  test("accepts only a method name every union member has", () => {
    const items: (
      { name(): string } | { name(): number; size(): number }
    )[] = [];

    expectTypeOf(map(items, "name")).toEqualTypeOf<(string | number)[]>();

    // @ts-expect-error `size` is missing from one member of the union
    map(items, "size");
  });

  test("passes nullish through and rejects invalid mappers", () => {
    expect(map(null, String)).toBeUndefined();
    expect(() => map([1], true as never)).toThrow(TypeError);

    expectTypeOf(map([1] as Maybe<number[]>, String)).toEqualTypeOf<
      string[] | undefined
    >();
  });
});
