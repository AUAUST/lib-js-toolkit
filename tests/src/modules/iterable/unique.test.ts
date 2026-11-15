import { describe, expect, expectTypeOf, test } from "vitest";

import { unique } from "@auaust/toolkit/iterable";

describe("unique", () => {
  test("yields first occurrences, treating NaN as one value", () => {
    const result = unique([1, NaN, 1, NaN, 2]);

    expect([...result]).toEqual([1, NaN, 2]);
    expectTypeOf(result).toEqualTypeOf<IteratorObject<number, undefined>>();
  });

  test("throws eagerly on non-iterables and passes nullish through", () => {
    expect(() => unique(42 as never)).toThrow(TypeError);
    expect(unique(null)).toBeUndefined();
  });
});
