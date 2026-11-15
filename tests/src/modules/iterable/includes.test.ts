import { describe, expect, expectTypeOf, test } from "vitest";

import { includes } from "@auaust/toolkit/iterable";

describe("includes", () => {
  test("finds NaN and closes the source once found", () => {
    let closed = false;

    function* source() {
      try {
        yield Number.NaN;

        yield 1;
      } finally {
        closed = true;
      }
    }

    expect(includes(source(), Number.NaN)).toBe(true);
    expect(closed).toBe(true);
    expect(includes(new Set([1]), 2)).toBe(false);
  });

  test("throws on a non-iterable and passes nullish through", () => {
    expect(() => includes(42 as never, 1)).toThrow(TypeError);
    expect(includes(null, 1)).toBeUndefined();
    expectTypeOf(includes([1], 1)).toEqualTypeOf<boolean>();
  });
});
