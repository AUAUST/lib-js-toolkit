import { describe, expect, expectTypeOf, test } from "vitest";

import { AssertionError, defined } from "@auaust/toolkit";

describe("defined", () => {
  test("throws on nullish values only", () => {
    expect(() => defined(null)).toThrow(AssertionError);

    expect(() => defined(undefined)).toThrow(
      "Expected a value that is not null or undefined.",
    );

    expect(defined(0)).toBe(0);
  });

  test("removes null and undefined from the type", () => {
    expectTypeOf((value: number | null | undefined) => {
      return defined(value);
    }).returns.toEqualTypeOf<number>();
  });
});
