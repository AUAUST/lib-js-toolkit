import { describe, expect, expectTypeOf, test } from "vitest";

import { AssertionError, assertMinLength } from "@auaust/toolkit";

describe("assertMinLength", () => {
  test("narrows an array long enough to a minimal-length tuple", () => {
    const array: number[] = [1, 2, 3];

    assertMinLength(array, 3);

    expectTypeOf(array).toEqualTypeOf<[number, number, number, ...number[]]>();

    expectTypeOf(array).toExtend<
      Parameters<(first: number, ...rest: number[]) => void>
    >();
  });

  test("throws for a shorter array", () => {
    expect(() => assertMinLength([1, 2], 3)).toThrow(
      new AssertionError("Expected at least 3 elements, received [1, 2]."),
    );

    expect(() => assertMinLength([1, 2], 3, "Too short")).toThrow(
      new AssertionError("Too short"),
    );
  });

  test("narrows a readonly array to a readonly tuple", () => {
    const array: readonly number[] = [1, 2];

    assertMinLength(array, 2);

    expectTypeOf(array).toEqualTypeOf<readonly [number, number, ...number[]]>();
  });

  test("keeps an array for a non-literal length", () => {
    const array: number[] = [1];

    assertMinLength(array, 1 as number);

    expectTypeOf(array).toEqualTypeOf<number[]>();
  });
});
