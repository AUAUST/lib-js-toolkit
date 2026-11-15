import { describe, expect, expectTypeOf, test, vi } from "vitest";

import { some } from "@auaust/toolkit/array";

describe("some", () => {
  test("stops at the first accepted item", () => {
    const predicate = vi.fn((value: number) => value === 1);

    expect(some([1, 2], predicate)).toBe(true);
    expect(predicate).toHaveBeenCalledTimes(1);
    expect(some([], Boolean)).toBe(false);
  });

  test("accepts a property name", () => {
    expect(some([{ on: false }, { on: true }], "on")).toBe(true);
    expect(some([{ on: 0 }], "on")).toBe(false);
  });

  test("passes nullish through and rejects invalid predicates", () => {
    expect(some(null, Boolean)).toBeUndefined();
    expect(() => some([1], true as never)).toThrow(TypeError);
    expectTypeOf(some([1] as const, Boolean)).toEqualTypeOf<boolean>();

    expectTypeOf(some([1] as number[] | undefined, Boolean)).toEqualTypeOf<
      boolean | undefined
    >();
  });
});
