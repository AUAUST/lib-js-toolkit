import { describe, expect, expectTypeOf, test } from "vitest";

import { lastIndexOf } from "@auaust/toolkit/array";

describe("lastIndexOf", () => {
  test("finds NaN and gives -1 when absent", () => {
    expect(lastIndexOf([Number.NaN, 1], Number.NaN)).toBe(0);
    expect(lastIndexOf([1], 2)).toBe(-1);
  });

  test("searches backwards from fromIndex, a negative one counted from the end", () => {
    expect(lastIndexOf([1, 2, 1], 1)).toBe(2);
    expect(lastIndexOf([1, 2, 1], 1, -2)).toBe(0);
    expect(lastIndexOf([1, 2, 1], 1, -9)).toBe(-1);
  });

  test("passes nullish through", () => {
    expect(lastIndexOf(undefined, 1)).toBeUndefined();
    expectTypeOf(lastIndexOf([1], 1)).toEqualTypeOf<number>();
  });
});
