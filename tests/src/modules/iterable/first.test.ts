import { describe, expect, expectTypeOf, test } from "vitest";

import { first } from "@auaust/toolkit/iterable";

describe("first", () => {
  test("returns the first value and closes the source", () => {
    let closed = false;

    function* source() {
      try {
        yield 1;

        yield 2;
      } finally {
        closed = true;
      }
    }

    const result = first(source());

    expect(result).toBe(1);
    expect(closed).toBe(true);
    expectTypeOf(result).toEqualTypeOf<number | undefined>();
  });

  test("returns undefined for an empty or nullish source", () => {
    expect(first([])).toBeUndefined();
    expect(first(null)).toBeUndefined();
    expect(() => first(42 as never)).toThrow(TypeError);
  });
});
