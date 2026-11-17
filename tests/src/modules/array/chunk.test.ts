import { describe, expect, expectTypeOf, test } from "vitest";

import { chunk } from "@auaust/toolkit/array";

describe("chunk", () => {
  test("splits items into batches, the last one shorter", () => {
    const source = [1, 2, 3, 4, 5];

    expect(chunk(source, 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(source).toEqual([1, 2, 3, 4, 5]);
    expect(chunk([], 2)).toEqual([]);
  });

  test("throws on invalid sizes and passes nullish through", () => {
    for (const size of [0, 1.5, Number.NaN]) {
      expect(() => chunk([1], size)).toThrow(RangeError);
    }

    expect(chunk(null, 2)).toBeUndefined();
    expect(chunk(undefined, 2)).toBeUndefined();
  });

  test("types batches of a readonly tuple as item arrays", () => {
    const tuple = [1, 2, 3] as const;

    expectTypeOf(chunk(tuple, 2)).toEqualTypeOf<(1 | 2 | 3)[][]>();
  });
});
