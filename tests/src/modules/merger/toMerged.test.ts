import { describe, expect, expectTypeOf, test } from "vitest";

import { toMerged } from "@auaust/toolkit/merger";

describe("toMerged", () => {
  test("returns a new object and leaves sources unchanged", () => {
    const first = {
      a: { x: 1 },
    };
    const second = {
      a: { y: 2 },
      b: 2,
    };
    const result = toMerged(first, second);

    expect(result).toEqual({
      a: { x: 1, y: 2 },
      b: 2,
    });
    expect(result).not.toBe(first);
    expect(first).toEqual({
      a: { x: 1 },
    });
    expect(second).toEqual({
      a: { y: 2 },
      b: 2,
    });
  });

  test("lets the first source holding a key decide its kind", () => {
    const result = toMerged(
      {
        a: 1,
      },
      {
        a: { x: 1 },
      },
      {
        b: { x: 1 },
      },
      {
        b: 2,
      },
    );

    expect(result).toEqual({
      a: 1,
      b: { x: 1 },
    });
    expectTypeOf(result.a).toEqualTypeOf<number>();
  });
});
