import { describe, expect, expectTypeOf, test } from "vitest";

import { range } from "@auaust/toolkit/iterable";

describe("range", () => {
  test("counts from 0 or start to an excluded end", () => {
    const result = range(3);

    expect([...result]).toEqual([0, 1, 2]);
    expect([...range(2, 8, 2)]).toEqual([2, 4, 6]);
    expect([...range(2, 2)]).toEqual([]);
    expectTypeOf(result).toEqualTypeOf<IteratorObject<number, undefined>>();
  });

  test("counts down with a negative step", () => {
    expect([...range(3, 0, -1)]).toEqual([3, 2, 1]);
    expect([...range(0, 3, -1)]).toEqual([]);
  });

  test("throws a RangeError on a zero or non-finite step", () => {
    expect(() => range(0, 3, 0)).toThrow(RangeError);
    expect(() => range(0, 3, Number.NaN)).toThrow(RangeError);
    expect(() => range(0, 3, Infinity)).toThrow(RangeError);
    expect(() => range("3" as never)).toThrow(TypeError);
  });
});
