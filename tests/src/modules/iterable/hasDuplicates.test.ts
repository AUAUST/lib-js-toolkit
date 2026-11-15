import { describe, expect, expectTypeOf, test } from "vitest";

import { hasDuplicates } from "@auaust/toolkit/iterable";

describe("hasDuplicates", () => {
  test("detects repeats by SameValueZero", () => {
    expect(hasDuplicates([1, NaN, NaN])).toBe(true);
    expect(hasDuplicates([1, 2, 3])).toBe(false);
    expect(hasDuplicates([])).toBe(false);
    expectTypeOf(hasDuplicates([1])).toEqualTypeOf<boolean>();
  });

  test("stops at the first duplicate of a lazy source and closes it", () => {
    let pulled = 0;
    let closed = false;

    function* source() {
      try {
        for (const value of [1, 2, 1, 3]) {
          pulled++;

          yield value;
        }
      } finally {
        closed = true;
      }
    }

    expect(hasDuplicates(source())).toBe(true);
    expect(pulled).toBe(3);
    expect(closed).toBe(true);
  });

  test("throws on non-iterables and passes nullish through", () => {
    expect(() => hasDuplicates(42 as never)).toThrow(TypeError);
    expect(hasDuplicates(null)).toBeUndefined();
  });
});
