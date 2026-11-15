import { describe, expect, expectTypeOf, test } from "vitest";

import { difference } from "@auaust/toolkit/array";

describe("difference", () => {
  test("keeps the first input's order and duplicates", () => {
    const result = difference([1, 1, 2], new Set([2]));

    expect(result).toEqual([1, 1]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  test("accepts readonly arrays and passes nullish through", () => {
    expectTypeOf(difference([1, 2] as const, [2])).toEqualTypeOf<(1 | 2)[]>();
    expect(difference(null, [])).toBeUndefined();
  });
});
