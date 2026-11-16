import { describe, expect, expectTypeOf, test } from "vitest";

import { AssertionError, ensureMinLength } from "@auaust/toolkit";

describe("ensureMinLength", () => {
  test("returns an array long enough as a minimal-length tuple", () => {
    const array: number[] = [1, 2, 3];
    const result = ensureMinLength(array, 3);

    expect(result).toBe(array);
    expectTypeOf(result).toEqualTypeOf<[number, number, number, ...number[]]>();

    const spread = (first: number, ...rest: number[]) => {
      return [first, ...rest];
    };

    expect(spread(...result)).toEqual([1, 2, 3]);
  });

  test("throws for a shorter array", () => {
    expect(() => ensureMinLength([1, 2], 3)).toThrow(
      new AssertionError("Expected at least 3 elements, received [1, 2]."),
    );

    expect(() => ensureMinLength([1, 2], 3, "Too short")).toThrow(
      new AssertionError("Too short"),
    );
  });

  test("returns a readonly tuple for a readonly array", () => {
    const array: readonly number[] = [1, 2];

    expectTypeOf(ensureMinLength(array, 2)).toEqualTypeOf<
      readonly [number, number, ...number[]]
    >();
  });

  test("returns an array for a non-literal length", () => {
    expectTypeOf(ensureMinLength([1], 1 as number)).toEqualTypeOf<number[]>();
  });
});
