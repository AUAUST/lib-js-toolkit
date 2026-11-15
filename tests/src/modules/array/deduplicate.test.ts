import { describe, expect, expectTypeOf, test } from "vitest";

import { deduplicate } from "@auaust/toolkit/array";

describe("deduplicate", () => {
  test("compacts the same array to first occurrences", () => {
    const array = [1, NaN, 1, NaN];
    const result = deduplicate(array);

    expect(result).toBe(array);
    expect(array).toEqual([1, NaN]);
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  test("passes nullish through", () => {
    expect(deduplicate(null)).toBeUndefined();
  });
});
