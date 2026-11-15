import { describe, expect, expectTypeOf, test } from "vitest";

import { includes } from "@auaust/toolkit/array";

describe("includes", () => {
  test("finds NaN", () => {
    expect(includes([Number.NaN], Number.NaN)).toBe(true);
    expect(includes([1], 2)).toBe(false);
  });

  test("starts from fromIndex, a negative one counted from the end", () => {
    expect(includes([1, 2], 1, -1)).toBe(false);
    expect(includes([1, 2], 2, 1)).toBe(true);
  });

  test("passes nullish through", () => {
    expect(includes(undefined, 1)).toBeUndefined();

    expectTypeOf(includes([1] as number[] | null, 1)).toEqualTypeOf<
      boolean | undefined
    >();
  });
});
