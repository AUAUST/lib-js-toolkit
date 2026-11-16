import { describe, expect, expectTypeOf, test } from "vitest";

import { overlaps } from "@auaust/toolkit/iterable";

describe("overlaps", () => {
  test("stops reading a generator at the first match", () => {
    const read: number[] = [];

    function* source(): Generator<number> {
      for (const value of [1, 2, 3]) {
        read.push(value);

        yield value;
      }
    }

    const result = overlaps(source(), [2]);

    expect(result).toBe(true);
    expect(read).toEqual([1, 2]);
    expectTypeOf(result).toEqualTypeOf<boolean>();
  });

  test("matches NaN, reads set-likes and passes nullish through", () => {
    expect(overlaps(new Set([1, Number.NaN]), [Number.NaN])).toBe(true);
    expect(overlaps([1], new Set([2]))).toBe(false);
    expect(overlaps(null as Iterable<number> | null, [1])).toBeUndefined();
  });
});
