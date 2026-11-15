import { describe, expect, expectTypeOf, test } from "vitest";

import { toSorted } from "@auaust/toolkit/array";

describe("toSorted", () => {
  test("copies a readonly tuple into a writable sorted array", () => {
    const tuple = [3, 1, 2] as const;
    const result = toSorted(tuple, (left, right) => left - right);

    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(tuple);
    expect(tuple).toEqual([3, 1, 2]);
    expectTypeOf(result).toEqualTypeOf<(1 | 2 | 3)[]>();
  });

  test("passes nullish through", () => {
    expect(toSorted(null)).toBeUndefined();
  });
});
