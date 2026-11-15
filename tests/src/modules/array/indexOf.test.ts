import { describe, expect, expectTypeOf, test } from "vitest";

import { indexOf } from "@auaust/toolkit/array";

describe("indexOf", () => {
  test("finds NaN and gives -1 when absent", () => {
    expect(indexOf([Number.NaN], Number.NaN)).toBe(0);
    expect(indexOf([1], 2)).toBe(-1);
  });

  test("starts from fromIndex, a negative one counted from the end", () => {
    expect(indexOf([1, 2, 1], 1, 1)).toBe(2);
    expect(indexOf([1, 2, 1], 1, -1)).toBe(2);
    expect(indexOf([1, 2, 1], 1, -9)).toBe(0);
  });

  test("passes nullish through", () => {
    expect(indexOf(null, 1)).toBeUndefined();
    expectTypeOf(indexOf([1], 1)).toEqualTypeOf<number>();
  });
});
