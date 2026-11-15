import { describe, expect, expectTypeOf, test } from "vitest";

import { difference } from "@auaust/toolkit/iterable";

describe("difference", () => {
  test("keeps the first input's order and duplicates", () => {
    const result = difference([1, 1, 2, NaN, 3], [NaN, 3]);

    expect([...result]).toEqual([1, 1, 2]);
    expectTypeOf(result).toEqualTypeOf<IteratorObject<number, undefined>>();
  });

  test("reads a set-like through has", () => {
    const evens = { has: (value: number) => value % 2 === 0 };

    expect([...difference([1, 2, 3, 4], evens)]).toEqual([1, 3]);
  });

  test("throws eagerly on invalid arguments and passes nullish through", () => {
    expect(() => difference(42 as never, [])).toThrow(TypeError);
    expect(() => difference([1], 42 as never)).toThrow(TypeError);
    expect(difference(null, [])).toBeUndefined();
  });
});
